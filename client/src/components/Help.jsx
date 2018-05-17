import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Help = (props) => (
  <Modal isOpen={props.viewHelp} toggle={props.viewHelpToggle} className="helpModal">
    <ModalHeader toggle={props.viewHelpToggle}>Help</ModalHeader>
    <ModalBody>
      <p>Provide instructions here.</p>
      <h6>Movement</h6>
      <p>Move to another room by typing a direction. Exits are (usually) listed in the room description, but don't take it as gospel!</p>
      <h7>Example move commands:</h7>
      <ul>
        <li>walk east</li>
        <li>go e</li>
        <li>northwest</li>
        <li>nw</li>
        <li>u</li>
        <li>up</li>
        <li>walk south west</li>
      </ul>
      <h7>Interaction</h7>
      <p>interaction instructions</p>
      <ul>
        <lh>Example interactions:</lh>
        <li></li>
      </ul>
      <h7>Hints</h7>
      <p></p>
      <ul>
        <li>The Minotaur is rather large; you might discover some portals won't accomodate the Beast.</li>
      </ul>
    </ModalBody>
    <ModalFooter>
      <button onClick={props.viewAboutToggle}>Close</button>
    </ModalFooter>
  </Modal>
);

export default Help;
