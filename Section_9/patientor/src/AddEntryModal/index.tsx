import React, { useState } from 'react';
import { Button, Modal, Segment } from 'semantic-ui-react';
import AddEntryForm from './AddEntryForm';
import { useStateValue } from '../state';
import { EntryFormValues, Type } from '../types';

interface Props {
    modalOpen: boolean;
    onSubmit: (values: EntryFormValues) => void;
    onClose: () => void;
    error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
    const [{ patient }] = useStateValue();
    const [type, setType] = useState<Type>(Type.Hospital);
    return (
        <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
            <Modal.Header>Add a new entry - {patient?.name}</Modal.Header>
            <Modal.Content>
                {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
                <Button onClick={() => setType(Type.Hospital)}>Hospital</Button>
                <Button onClick={() => setType(Type.OccupationalHealthcare)}>Occupational Healthcare</Button>
                <Button onClick={() => setType(Type.HealthCheck)}>Health Check</Button>
                <AddEntryForm type={type} onSubmit={onSubmit} onClose={onClose} />
            </Modal.Content>
        </Modal>
    );
};

export default AddEntryModal;