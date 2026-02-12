import React from 'react';
import { DiagnosticCardData } from '../../lib/chatLogic';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface DiagnosticCardProps {
  data: DiagnosticCardData;
}

export const DiagnosticCard: React.FC<DiagnosticCardProps> = ({ data }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/10 border-red-500/50 text-red-500';
      case 'high': return 'bg-orange-500/10 border-orange-500/50 text-orange-500';
      case 'medium': return 'bg-yellow-500/10 border-yellow-500/50 text-yellow-500';
      default: return 'bg-blue-500/10 border-blue-500/50 text-blue-500';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'high': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'medium': return <Info className="w-5 h-5 text-yellow-500" />;
      default: return <CheckCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className={`mt-3 p-4 rounded-xl border backdrop-blur-md ${getSeverityColor(data.severity)} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
      <div className="flex items-start gap-3">
        {getSeverityIcon(data.severity)}
        <div className="flex-1">
          <h3 className="font-bold text-sm uppercase tracking-wide opacity-90 mb-1">{data.title}</h3>
          
          <div className="grid grid-cols-2 gap-2 text-xs mb-3">
            <div className="bg-white/5 p-2 rounded">
              <span className="block opacity-60">Symptom</span>
              <span className="font-medium">{data.symptom}</span>
            </div>
            <div className="bg-white/5 p-2 rounded">
              <span className="block opacity-60">Probable Cause</span>
              <span className="font-medium">{data.probableCause}</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold opacity-80 uppercase">Recommended Action:</p>
            {data.recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-center justify-between bg-black/20 p-2 rounded text-sm">
                <span className="font-bold text-emerald-400">{rec.product}</span>
                <span className="opacity-80 text-xs text-right">{rec.action}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 text-[10px] opacity-60 flex items-center gap-1">
            <Info className="w-3 h-3" />
            <span>AI Confidence: {Math.round(data.confidence * 100)}% • Consult a vet for confirmation</span>
          </div>
        </div>
      </div>
    </div>
  );
};
