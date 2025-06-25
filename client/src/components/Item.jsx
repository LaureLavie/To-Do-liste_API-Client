import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

export default function Item({ task, handleDelete, handleUpdate }) {
  return (
    <div className="flex justify-between items-center gap-3 mb-1 py-1 border-b">
      <p>{task.title}</p>
      <input type="checkbox" checked={task.status} readOnly />
      <div className="flex items-center gap-3">
        <button className="btn btn-square" onClick={handleDelete}>
          <MdDelete size={24} color="red" />
        </button>
        <button className="btn btn-square" onClick={handleUpdate}>
          <FiEdit size={24} color="purple" />
        </button>
      </div>
    </div>
  );
}
