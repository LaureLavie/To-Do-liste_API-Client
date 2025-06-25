import { useEffect, useState } from "react";
import { RiHeartAddFill } from "react-icons/ri";
import Item from "../components/Item";
import TaskModal from "../components/TaskModal";
import EditModal from "../components/EditModal";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL;

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [id, setId] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [headline, setHeadline] = useState("");

  // Récupérer les tâches
  const fetchTasks = async () => {
    const response = await fetch(`${API_URL}/task`, {
      credentials: true,
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    if (response.ok) {
      const data = await response.json();
      setTasks(data);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Supprimer une tâche
  const handleDelete = async (id) => {
    const response = await fetch(`${API_URL}/task/${id}`, {
      method: "DELETE",
      credentials: true,
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    if (response.ok) {
      const data = await response.json();
      fetchTasks();
      // toast.warning(data.message);
    }
  };

  // Ajouter ou modifier une tâche
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      // Edition
      const response = await fetch(`${API_URL}/task/${id}`, {
        method: "PUT",
        credentials: true,
        // headers: {
        //   "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
        // },
        body: JSON.stringify({ title: updatedTitle, status: isChecked }),
      });
      if (response.ok) {
        const data = await response.json();
        setIsEdit(false);
        setUpdatedTitle("");
        setIsChecked(false);
        setId("");
        fetchTasks();
        document.getElementById("edit_modal").close();
        Swal.fire("success", "", success); //info, warning, error, question
      }
    } else {
      // Création
      const response = await fetch(`${API_URL}/task`, {
        method: "POST",
        credentials: true,
        // headers: {
        //   "Content-Type": "application/json",
        //   Authorization: `Bearer ${token}`,
        // },
        body: JSON.stringify({ title }),
      });
      if (response.ok) {
        setTitle("");
        fetchTasks();
        document.getElementById("my_modal_3").close();
      }
    }
  };

  // Préparer l'édition
  const handleUpdate = (task) => {
    setIsChecked(task.status);
    setUpdatedTitle(task.title);
    setId(task._id);
    setIsEdit(true);
    setHeadline("Modifier une tâche");
    document.getElementById("edit_modal").showModal();
  };

  const handleAdd = () => {
    document.getElementById("my_modal_3").showModal();
    setHeadline("Ajouter une nouvelle tâche");
    setIsEdit(false);
    setTitle("");
  };

  // if (!token) {
  //   return <Navigate to={"/"} />;
  // }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-fuchsia-700 via-purple-800 to-pink-700 py-10">
      <div className="w-full max-w-lg bg-white/90 rounded-3xl shadow-2xl border-4 border-fuchsia-700 p-8 relative">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-fuchsia-700 drop-shadow-lg tracking-widest uppercase">
          <span className="bg-gradient-to-r from-fuchsia-700 via-pink-600 to-purple-700 bg-clip-text text-transparent">
            Ma TODO List
          </span>
        </h1>
        <div className="flex justify-center mb-6">
          <button
            type="button"
            className="btn btn-circle bg-gradient-to-br from-fuchsia-700 to-pink-600 border-0 shadow-lg hover:scale-110 transition-transform"
            onClick={handleAdd}
            title="Ajouter une tâche"
          >
            <RiHeartAddFill size={36} className="text-white drop-shadow" />
          </button>
        </div>

        {tasks.map((task) => (
          <Item
            key={task._id}
            task={task}
            handleDelete={() => handleDelete(task._id)}
            handleUpdate={() => handleUpdate(task)}
          />
        ))}

        {/* Modal d'ajout */}
        <TaskModal
          headline={headline}
          handleSubmit={handleSubmit}
          title={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Modal d'édition */}
        <EditModal
          handleSubmit={handleSubmit}
          updatedTitle={updatedTitle}
          isChecked={isChecked}
          onChangeTitle={(e) => setUpdatedTitle(e.target.value)}
          onChangeStatus={(e) => setIsChecked(e.target.checked)}
        />
      </div>
    </div>
  );
}
