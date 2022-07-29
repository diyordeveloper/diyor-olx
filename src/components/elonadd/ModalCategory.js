import React from "react";
import Modal from "react-bootstrap/Modal";
import { useUserContext } from "../../Contexts/Context";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Spinner from "react-bootstrap/Spinner"; 
import {categories} from '../category/categories'
function ModalCategory({
  showModal,
  toggleModal,
  onShowForm,
  showForm,
  onCategoryItm,
}) { 

  return (
    <Modal show={showModal} onHide={toggleModal} size={"lg"}>
      <Modal.Header closeButton>Bo'limlardan birini tanlang</Modal.Header>
      <Modal.Body>
        <div className="row">
          {categories.length === 0 ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : (
            <>
              {categories.map((itm, idx) => (
                <div className="col-4 mt-4   category_card" key={idx}>
                  <div onClick={() => onCategoryItm(itm)}>
                    <div
                      id={itm.id}
                      onClick={() => onShowForm(idx + 1)}
                      className={`${
                        showForm === idx + 1
                          ? " p-2 card card_cate  actives "
                          : "card card_cate p-2"
                      }`}
                      style={{ background: itm.bg_color }}
                    >
                      <div className="row">
                        <div className="col-5">
                          <img
                            src={itm.url}
                            className="img-fluid"
                            alt="Error!"
                          />
                        </div>
                        <div className="col-7">
                          <strong>{itm.category} </strong>
                          <ArrowForwardIcon className="icon_" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalCategory;
