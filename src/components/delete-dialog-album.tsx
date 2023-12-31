import { useNavigate, useParams } from 'react-router-dom';
import api from "@/api/api.ts";
import {StatusCodes} from "http-status-codes";
import {useAuth} from "@/context/auth-context.tsx";

const DeleteAlbumDialog = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const { onLogout } = useAuth();

  const handleDeleteAlbum = async () => {
    try {
      api.post("/verify-token",).then((response) => {
        if (response.status !== StatusCodes.OK) {
          onLogout();
        }
      });

    await api.delete(
        `/premium-album/${albumId}`
      );
      navigate(`/album`);
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };

  const handleCancel = () => {
    navigate(`/${albumId}/songs`);
  };

  return (
    <>
      {(
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-white rounded p-8 z-10">
              <div className="mb-4 text-lg font-semibold">Delete Album Confirmation</div>
              <div className="mb-4">Are you sure you want to delete this Album?</div>
              <div className="flex justify-end">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 mr-2 bg-gray-300 hover:bg-gray-400 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAlbum}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteAlbumDialog;
