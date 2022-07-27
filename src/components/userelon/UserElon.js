import React from "react";
import { useAuthContext } from "../../Contexts/AuthContext";
import { useUserContext } from "../../Contexts/Context";

function UserElon() {
  const { user, currentUser, uid } = useAuthContext();
  const { products } = useUserContext();

  return (
    <div>
      <div className="row">
        {products
        //   .filter((f) => f.uid === currentUser.uid)
          .map((itm, idx) => (
            <div className={` col-4 ${user.name === itm.name ? "  bg-danger": "bg-primary" }`}  >
              <div className="card p-3">
                <img src={itm.url} alt="" />
                <h4>{itm.sarlavha}</h4>
                <h4>{itm.tavsif}</h4>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default UserElon;
