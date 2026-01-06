'use client';

import { QRCodeSVG } from 'qrcode.react';

export default function ZelleQRCode() {
  const zelleRecipient = 'vishaknag@me.com';
  
  return (
    <div className="bg-chocolate-50 rounded-xl p-4 sm:p-6 text-center">
      <p className="text-chocolate-700 font-medium mb-4 text-sm sm:text-base">
        Scan QR Code with Zelle
      </p>
      <div className="bg-white p-3 sm:p-4 rounded-xl inline-block shadow-md">
        <QRCodeSVG 
          value={zelleRecipient}
          size={200}
          level="H"
          includeMargin={true}
          fgColor="#5D4037"
        />
      </div>
      <p className="text-xs sm:text-sm text-chocolate-600 mt-3">
        Send to: <strong>{zelleRecipient}</strong>
      </p>
    </div>
  );
}
