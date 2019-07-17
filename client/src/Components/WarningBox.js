import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export default function WarningBox({showWarning, setShowWarning, deleteVac}){

        function handleClose() {
            setShowWarning({showWarning: false});
        }

        return (
            <>
                <Modal show={showWarning} onHide={handleClose}>
                    <Modal.Body>This vacation is about to be deleted</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>handleClose()}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={()=>{handleClose(); deleteVac()}}>
                            Continue
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );

}







