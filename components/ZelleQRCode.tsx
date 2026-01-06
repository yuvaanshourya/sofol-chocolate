'use client';

import { memo, useEffect, useRef } from 'react';

const ZelleQRCode = memo(() => {
  console.log('ZelleQRCode component rendered');
  const containerRef = useRef<HTMLDivElement>(null);
  const imageCreated = useRef(false);
  
  useEffect(() => {
    if (!containerRef.current || imageCreated.current) return;
    
    // Create the image element directly in the DOM, bypassing React
    const img = document.createElement('img');
    img.src = '/QR/zelle-qr.png';
    img.alt = 'Zelle QR Code';
    img.style.width = '250px';
    img.style.height = '250px';
    img.style.objectFit = 'contain';
    img.style.imageRendering = 'crisp-edges';
    img.style.display = 'block';
    
    containerRef.current.appendChild(img);
    imageCreated.current = true;
    
    console.log('QR code image created directly in DOM');
  }, []);
  
  return (
    <div className="bg-chocolate-50 rounded-xl p-6 text-center">
      <p className="text-chocolate-700 font-medium mb-4">
        Scan QR Code with Zelle
      </p>
      <div className="bg-white p-4 rounded-xl inline-block shadow-md">
        <div 
          ref={containerRef}
          className="w-[250px] h-[250px] mx-auto flex items-center justify-center"
        />
      </div>
    </div>
  );
});

ZelleQRCode.displayName = 'ZelleQRCode';

// Prevent Fast Refresh from replacing this component
if (typeof window !== 'undefined') {
  // @ts-ignore
  if (window.__zelleQRMounted) {
    console.log('ZelleQRCode already mounted, using existing');
  }
  // @ts-ignore
  window.__zelleQRMounted = true;
}

export default ZelleQRCode;
