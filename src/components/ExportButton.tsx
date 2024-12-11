import React, { useState } from 'react';
import { FileSpreadsheet } from 'lucide-react';
import { useMemberContext } from '../context/MemberContext';
import { exportToCSV } from '../utils/exportService';

export const ExportButton: React.FC = () => {
  const { members, payments } = useMemberContext();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      await exportToCSV(members, payments);
    } catch (error) {
      console.error('Export failed:', error);
      alert('L\'exportation a échoué. Veuillez réessayer.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
    >
      <FileSpreadsheet className="w-4 h-4 mr-2" />
      {isExporting ? 'Exportation...' : 'Exporter les données'}
    </button>
  );
};