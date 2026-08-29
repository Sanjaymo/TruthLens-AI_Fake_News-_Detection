export interface TraceSpan {
  id: string;
  traceId: string;
  parentSpanId?: string;
  name: string;
  kind: "INTERNAL" | "CLIENT" | "SERVER" | "PRODUCER" | "CONSUMER";
  startTime: number;
  endTime?: number;
  durationMs?: number;
  attributes: Record<string, string | number | boolean | undefined>;
  status: "OK" | "ERROR" | "UNSET";
  error?: string;
}

export interface AgentTrace {
  traceId: string;
  agentName: string;
  sessionOrTurnId: string;
  startTime: string;
  endTime?: string;
  totalDurationMs?: number;
  spans: TraceSpan[];
  metadata: {
    model: string;
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
    verdict?: string;
    credibilityScore?: number;
    riskLevel?: string;
  };
}

// In-memory ring buffer of recent agent traces (max 50)
const MAX_TRACES = 50;
const tracesBuffer: AgentTrace[] = [];

// Generate standard 16-byte hex TraceId and 8-byte SpanId according to W3C Trace Context
export function generateTraceId(): string {
  const bytes = new Uint8Array(16);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < 16; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function generateSpanId(): string {
  const bytes = new Uint8Array(8);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < 8; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Format W3C traceparent header: 00-{traceId}-{spanId}-01
export function formatTraceParent(traceId: string, spanId: string): string {
  return `00-${traceId}-${spanId}-01`;
}

export class ActiveAgentTracer {
  private currentTrace: AgentTrace;

  constructor(agentName = "VeritasNLP-VerificationAgent", traceId?: string) {
    const tid = traceId || generateTraceId();
    this.currentTrace = {
      traceId: tid,
      agentName,
      sessionOrTurnId: `turn_${Date.now()}`,
      startTime: new Date().toISOString(),
      spans: [],
      metadata: {
        model: "gemini-3.7-flash",
      },
    };
  }

  get traceId(): string {
    return this.currentTrace.traceId;
  }

  public startSpan(
    name: string,
    attributes: Record<string, string | number | boolean | undefined> = {},
    parentSpanId?: string
  ): { spanId: string; end: (status?: "OK" | "ERROR", error?: string, extraAttrs?: Record<string, any>) => TraceSpan } {
    const spanId = generateSpanId();
    const startTime = Date.now();

    const span: TraceSpan = {
      id: spanId,
      traceId: this.currentTrace.traceId,
      parentSpanId,
      name,
      kind: "INTERNAL",
      startTime,
      attributes: {
        "agent.name": this.currentTrace.agentName,
        "cloud.platform": "cloudflare_workers",
        "openinference.span.kind": "AGENT",
        ...attributes,
      },
      status: "UNSET",
    };

    this.currentTrace.spans.push(span);

    return {
      spanId,
      end: (status = "OK", error?: string, extraAttrs?: Record<string, any>) => {
        span.endTime = Date.now();
        span.durationMs = span.endTime - span.startTime;
        span.status = status;
        if (error) span.error = error;
        if (extraAttrs) {
          span.attributes = { ...span.attributes, ...extraAttrs };
        }
        return span;
      },
    };
  }

  public finalize(metadata?: Partial<AgentTrace["metadata"]>): AgentTrace {
    this.currentTrace.endTime = new Date().toISOString();
    const firstSpanStart = this.currentTrace.spans[0]?.startTime || Date.now();
    const lastSpanEnd = this.currentTrace.spans[this.currentTrace.spans.length - 1]?.endTime || Date.now();
    this.currentTrace.totalDurationMs = Math.max(1, lastSpanEnd - firstSpanStart);

    if (metadata) {
      this.currentTrace.metadata = { ...this.currentTrace.metadata, ...metadata };
    }

    // Add to buffer
    tracesBuffer.unshift(this.currentTrace);
    if (tracesBuffer.length > MAX_TRACES) {
      tracesBuffer.pop();
    }

    return this.currentTrace;
  }
}

export function getRecordedTraces(): AgentTrace[] {
  return tracesBuffer;
}
