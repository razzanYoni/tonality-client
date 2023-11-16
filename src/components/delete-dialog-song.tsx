import React from 'react';
import { useState } from 'react';


const DeleteSongDialog: React.FC = () => {


  return (
    <>
      {(
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-white rounded p-8 z-10">
              <div className="mb-4 text-lg font-semibold">Delete Song Confirmation</div>
              <div className="mb-4">Are you sure you want to delete this Song?</div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 mr-2 bg-gray-300 hover:bg-gray-400 rounded"
                >
                  Batal
                </button>
                <button
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteSongDialog;
