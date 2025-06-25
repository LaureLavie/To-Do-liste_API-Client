import React from "react";

export default function EditModal({
  handleSubmit,
  updatedTitle,
  isChecked,
  onChangeTitle,
  onChangeStatus,
}) {
  return (
    <dialog id="edit_modal" className="modal">
      <div className="modal-box">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            value={updatedTitle}
            onChange={onChangeTitle}
            className="input input-primary w-full mt-5"
            placeholder="Modifier la tâche..."
            required
          />
          <div className="flex items-center gap-3 mt-2">
            <input
              id="edit-status"
              className="checkbox checkbox-primary"
              type="checkbox"
              onChange={onChangeStatus}
              checked={isChecked}
            />
            <label
              htmlFor="edit-status"
              className="text-base select-none cursor-pointer"
            >
              Tâche terminée
            </label>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="btn"
              onClick={() => document.getElementById("edit_modal").close()}
            >
              Annuler
            </button>
            <button className="btn btn-primary" type="submit">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
