import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddEntryForm, { HospitalEntryFormValues, OccupationalEntryFormValues, HealthCheckEntryFormValues } from './AddEntryForm';
import { useStateValue } from '../state';


interface Props {
    modalOpen: boolean;
    onSubmit: (values: HospitalEntryFormValues | OccupationalEntryFormValues | HealthCheckEntryFormValues) => void;
    onClose: () => void;
    error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
    const [{ patient }] = useStateValue();
    return (
        <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
            <Modal.Header>Add a new entry - {patient?.name}</Modal.Header>
            <Modal.Content>
                {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
                <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
            </Modal.Content>
        </Modal>
    );
};

export default AddEntryModal;