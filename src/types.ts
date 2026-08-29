export type VerdictType =
  | "AUTHENTIC"
  | "MOSTLY_ACCURATE"
  | "MIXED_OR_UNVERIFIED"
  | "MISLEADING_OR_BIASED"
  | "FABRICATED_OR_FAKE"
  | "SATIRE";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type BiasCategory =
  | "FAR_LEFT"
  | "LEAN_LEFT"
  | "CENTER_BALANCED"
  | "LEAN_RIGHT"
  | "FAR_RIGHT"
  | "CONSPIRATORIAL_FRINGE";

export interface KeyClaim {
  claim: string;
  status: "VERIFIED" | "DISPUTED" | "UNSUBSTANTIATED" | "DEBUNKED";
  explanation: string;
}

export interface AttentionToken {
  token: string;
  weight: number; // 0.1 to 1.0
  flagReason: string;
  category?: "SENSATIONAL" | "UNSUBSTANTIATED" | "EMOTIVE" | "URGENT" | "BIAS";
}

export interface BiasSpectrum {
  category: BiasCategory | string;
  score: number; // -100 to +100
  description: string;
}

export interface LinguisticMarkers {
  emotionalArousal: number; // 0-100
  subjectivityIndex: number; // 0-100
  syntheticTextScore: number; // 0-100 (AI generated likelihood)
  sensationalismScore: number; // 0-100
}

export interface FactCheckReference {
  title: string;
  source: string;
  finding: string;
}

export interface SourceCredibilityAnalysis {
  domain: string;
  publisherName: string;
  domainAgeYears: number;
  ownershipTransparency: "HIGH" | "MEDIUM" | "LOW" | "OPAQUE";
  editorialStandardsRating: number; // 0-100
  factCheckHistoryCount: {
    verifiedTrue: number;
    mixed: number;
    debunkedFalse: number;
  };
  domainClassification: string;
  riskFactors: string[];
  positiveIndicators: string[];
}

export interface ConflictingSourceCitation {
  id: string;
  claimTarget: string;
  reputableSource: string;
  sourceDomain: string;
  sourceTrustScore: number;
  contradictionSummary: string;
  originalArticleClaim: string;
  verifiedFactStatus: "REFUTES_CLAIM" | "CORROBORATES_CLAIM" | "PARTIALLY_SUPPORTS" | "DISPUTES_CONTEXT";
  publishedDate: string;
  referenceUrl?: string;
}

export interface ExplainableReasoning {
  overallExplanation: string;
  primaryDeceptionTriggers: Array<{
    category: "SENSATIONALISM" | "SOURCE_OPACITY" | "FACTUAL_CONFLICT" | "LOGICAL_FALLACY" | "SYNTHETIC_GENERATION" | "EMOTIONAL_URGENCY";
    title: string;
    description: string;
    severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
    evidence: string;
  }>;
  sourceAnalysis: SourceCredibilityAnalysis;
  conflictingCitations: ConflictingSourceCitation[];
  linguisticKeywordBreakdown: Array<{
    keyword: string;
    category: string;
    salienceScore: number; // 0-100
    impactExplanation: string;
    surroundingContext: string;
  }>;
  decisionFlowSteps: Array<{
    stepNumber: number;
    stepName: string;
    finding: string;
    confidenceImpact: string;
    status: "PASS" | "WARNING" | "FAIL";
  }>;
}

export interface CommunityReview {
  id: string;
  articleId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  userReputationScore: number;
  userBadge: "Master Auditor" | "Senior Analyst" | "Verified Fact-Checker" | "Community Detective" | "Contributor";
  vote: "AGREE_WITH_AI" | "DISAGREE_WITH_AI";
  suggestedVerdict: VerdictType;
  comment: string;
  corroboratingUrl?: string;
  timestamp: string;
  helpfulVotes: number;
  userHasUpvoted?: boolean;
}

export interface CommunityConsensus {
  totalVotes: number;
  upvotesAi: number; // agree with AI
  downvotesAi: number; // disagree with AI
  agreementRate: number; // e.g. 88%
  communityVerdict: VerdictType;
  consensusStrength: "STRONG_CONSENSUS" | "MODERATE_CONSENSUS" | "DISPUTED" | "INSUFFICIENT_DATA";
  reviews: CommunityReview[];
  userVote?: "AGREE_WITH_AI" | "DISAGREE_WITH_AI";
}

export interface VerificationResult {
  id: string;
  timestamp: string;
  title: string;
  textSnippet: string;
  fullText: string;
  sourceUrl?: string;
  domain?: string;
  verdict: VerdictType;
  credibilityScore: number; // 0-100
  riskLevel: RiskLevel;
  confidence: number; // 0-100
  summary: string;
  keyClaims: KeyClaim[];
  attentionTokens: AttentionToken[];
  biasSpectrum: BiasSpectrum;
  linguisticMarkers: LinguisticMarkers;
  logicalFallacies: string[];
  recommendedActions: string[];
  trustedReferences?: FactCheckReference[];
  explainableReasoning?: ExplainableReasoning;
  communityConsensus?: CommunityConsensus;
  topicTag?: "Politics" | "Health & Science" | "Technology" | "Geopolitics" | "Finance" | "General";
  isBookmarked?: boolean;
  userNotes?: string;
  hashSignature?: string;
}

export interface UserReputationProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  reputationScore: number; // e.g. 1420 pts
  reputationTier: "Master Truth Auditor" | "Senior Forensic Analyst" | "Verified Fact-Checker" | "Community Detective" | "Contributor";
  accuracyRate: number; // e.g. 96.4%
  totalReviews: number;
  totalSubmissions: number;
  approvedSubmissions: number;
  consensusAlignmentScore: number; // e.g. 94%
  badges: Array<{
    id: string;
    title: string;
    icon: string;
    description: string;
    unlockedAt: string;
  }>;
  recentActivities: Array<{
    id: string;
    action: string;
    pointsDelta: number;
    timestamp: string;
    targetTitle: string;
  }>;
}

export interface UserSubmittedReport {
  id: string;
  submittedBy: string;
  submittedByReputation: number;
  timestamp: string;
  title: string;
  sourceUrl?: string;
  domain?: string;
  textSnippet: string;
  suspectedReason: string;
  category: "Health & Medical" | "Politics & Elections" | "Financial Scam" | "AI Generated / Deepfake" | "Conspiracy / Fringe" | "Other";
  evidenceLink?: string;
  status: "PENDING_REVIEW" | "COMMUNITY_FLAGGED" | "CLEARED_AUTHENTIC" | "IN_TRAINING_POOL";
  upvotes: number; // votes to flag as fake
  downvotes: number; // votes indicating authentic/cleared
  userVote?: "FLAG_AS_FAKE" | "VERIFY_AS_REAL";
  communityVotes: Array<{
    userId: string;
    userName: string;
    vote: "FLAG_AS_FAKE" | "VERIFY_AS_REAL";
    notes?: string;
    timestamp: string;
  }>;
  aiPreAssessment?: {
    credibilityScore: number;
    verdict: VerdictType;
    riskLevel: RiskLevel;
  };
}

export interface RetrainingPipelineMetrics {
  lastRetrainedAt: string;
  modelVersion: string;
  totalTrainingSamples: number;
  pendingFeedbackSamples: number;
  currentAccuracy: number; // e.g. 96.8%
  f1Score: number; // e.g. 0.964
  precision: number;
  recall: number;
  activeLoss: number;
  epochProgress?: number;
  isRetrainingActive?: boolean;
  confusionMatrix: {
    truePositives: number;
    falsePositives: number;
    trueNegatives: number;
    falseNegatives: number;
  };
  recentEpochLogs: Array<{
    epoch: number;
    loss: number;
    valAccuracy: number;
    f1Score: number;
    samplesProcessed: number;
    timestamp: string;
  }>;
}

export type TrustTier = "VERY_HIGH" | "HIGH" | "MIXED" | "LOW" | "FLAGGED_DISINFO";

export interface TrackedSource {
  id: string;
  domain: string;
  name: string;
  category: "News Agency" | "Mainstream Media" | "Scientific Journal" | "Fact-Checker" | "Alternative Media" | "Known Satire" | "Flagged Disinformation";
  trustScore: number; // 0-100
  tier: TrustTier;
  factCheckRecord: string;
  bias: BiasCategory;
  isUserWhitelisted?: boolean;
  isUserBlacklisted?: boolean;
  notes?: string;
  lastChecked: string;
}

export type AlertSeverity = "CRITICAL" | "WARNING" | "INFO";

export interface AlertItem {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  sourceArticleId?: string;
  sourceDomain?: string;
  isRead: boolean;
  actionLabel?: string;
}

export interface AlertRule {
  id: string;
  name: string;
  enabled: boolean;
  condition: "CREDIBILITY_BELOW" | "RISK_EQUAL" | "SYNTHETIC_TEXT_ABOVE" | "UNVERIFIED_HEALTH";
  threshold?: number;
  riskValue?: RiskLevel;
  playAudio: boolean;
  showToast: boolean;
}

export interface ReminderItem {
  id: string;
  title: string;
  targetDate: string;
  articleId?: string;
  notes?: string;
  completed: boolean;
}

export interface LinkedDevice {
  id: string;
  name: string;
  type: "Desktop Browser" | "Chrome Extension" | "Mobile App" | "Tablet";
  lastSync: string;
  isCurrent: boolean;
  ipAddress?: string;
}

export interface BiometricSettings {
  isEnabled: boolean;
  isLocked: boolean;
  biometricType: "touch_id" | "face_id" | "windows_hello" | "pin";
  pinCode?: string;
  lockTimeoutMinutes: number; // e.g. 5, 15, 30, never (0)
  lastUnlockedAt?: string;
}

export interface SyncState {
  isAutoSyncEnabled: boolean;
  lastSyncTimestamp: string;
  syncStatus: "synced" | "syncing" | "offline" | "error";
  linkedDevices: LinkedDevice[];
  cloudStorageUsedKb: number;
}
