export default interface IDiagnosticMessage {
  criticalErrorMessages?: string[];
  nonCriticalErrorMessages?: string[];
  warningMessages?: string[];
  informationMessages?: string[];
}
