import React from "react";

export default function TaskModal({ handleSubmit, title, onChange, headline }) {
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <h2 className="text-2xl">{headline}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            required
            value={title}
            placeholder="saisir le nom de la tâche..."
            type="text"
            onChange={onChange}
            className="input input-primary w-full mt-5"
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="btn"
              onClick={() => document.getElementById("my_modal_3").close()}
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
