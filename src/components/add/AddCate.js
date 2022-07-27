import React, { useState } from "react";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { storage,db } from "../../firebase.config";

function AddCate() {
  const [loader, setLoader] = useState(false);
  const [imageBanner, setImageBanner] = useState(null);

  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
  function ImageSelectBanner(e) {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setImageBanner(selectedFile);
      } else {
        setImageBanner(null);
      }
    } else {
      console.log("please select your file");
    }
  }
  function CategorySubmit(e) {
    setLoader(true);
    e.preventDefault();
    const category = e.target[0].value;
    if (imageBanner !== null) {
      const uploadTask = storage
        .ref(`categories/${imageBanner.name}`)
        .put(imageBanner);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => console.log(error.message),
        () => {
          storage
            .ref("categories")
            .child(imageBanner.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("categories")
                .add({
                  id: v4(),
                  category,
                  url,
                })
                .then(() => {
                  toast.success("Successfully Added");
                  document.getElementById("file").value = "";
                  setLoader(false);
                  e.target[0].value = "";
                  setImageBanner(null);
                })
                .catch((error) => console.log(error.message));
            });
        }
      );
    } else {
      setLoader(false);

      toast.error("warn");
    }
  }
  return (
    <div>
      <form onSubmit={CategorySubmit} id={"categoryid"}>
        <input
          type="text"
          className="form-control mt-3"
          placeholder="add category"
        />
        <input
          type="file"
          id="file"
          className="form-control mt-3"
          onChange={ImageSelectBanner}
        />
        <button className="btn btn-success mt-3" form="categoryid">
          {loader ? (
            <>
              <span
                className="spinner-border spinner-border-sm  "
                role="status"
                aria-hidden="true"
              ></span>
              <span className="sr-only ">Loading...</span>
            </>
          ) : (
            "Added"
          )}
        </button>
      </form>
    </div>
  );
}

export default AddCate;
