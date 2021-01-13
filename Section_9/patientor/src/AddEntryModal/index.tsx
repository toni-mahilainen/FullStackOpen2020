import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddEntryForm from './AddEntryForm';
import { Entry, Patient } from '../types';

export type EntryFormValues = Omit<Entry, "id">;

interface Props {
    patient: Patient;
    modalOpen: boolean;
    onSubmit: (values: EntryFormValues) => void;
    onClose: () => void;
    error?: string;
}

const AddEntryModal = ({ patient, modalOpen, onClose, onSubmit, error }: Props) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
        <Modal.Header>Add a new entry - {patient.name}</Modal.Header>
        <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
        </Modal.Content>
    </Modal>
);

export default AddEntryModal;