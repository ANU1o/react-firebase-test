import { useEffect, useState } from "react";
import { Auth } from "./components/auth";
import { db, auth, storage } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);

  const [newMovie, setNewMovie] = useState("");
  const [newRelease, setNewRelease] = useState(0);
  const [newOscar, setNewOscar] = useState(false);

  const [fileUpload, setFileUpload] = useState(null);

  const [updatetitle, setUpdatetitle] = useState("");

  const movieCollectionRef = collection(db, "movies");

  const uploadFile = async () => {
    if (!fileUpload) return;
    const fileFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(fileFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };

  const getMovieList = async () => {
    //Read Data
    try {
      const data = await getDocs(movieCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log(filteredData);
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
    //Set movie list to data
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const deleteMovie = async (del) => {
    const movieDoc = doc(db, "movies", del);
    await deleteDoc(movieDoc);
  };

  const updateMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatetitle });
  };

  const onSubmit = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: newMovie,
        releaseDate: newRelease,
        oscarReception: newOscar,
        userID: auth?.currentUser?.uid,
      });
    } catch (err) {
      console.error(err);
    }
    getMovieList();
  };

  return (
    <div className="App">
      <Auth />
      <input
        type="text"
        placeholder="movie name"
        onChange={(e) => setNewMovie(e.target.value)}
      />
      <input
        type="number"
        placeholder="release date"
        onChange={(e) => setNewRelease(Number(e.target.value))}
      />
      <input
        type="checkbox"
        name="Oscar"
        id="Oscar"
        checked={newOscar}
        onChange={(e) => setNewOscar(e.target.checked)}
      />
      <label htmlFor="Oscar">Oscar Recipient</label>
      <button onClick={onSubmit}>Submit Movie</button>
      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.oscarReception ? "green" : "red" }}>
              {movie.title}
            </h1>
            <h2>{movie.releaseDate}</h2>
            <button onClick={() => deleteMovie(movie.id)}>Delete</button>
            <input
              type="text"
              placeholder="new title"
              onChange={(e) => setUpdatetitle(e.target.value)}
            />
            <button onClick={() => updateMovie(movie.id, updatetitle)}>
              update title
            </button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
