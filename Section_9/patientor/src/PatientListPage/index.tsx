import React from "react";
import axios from "axios";
import { Container, Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import AddPatientModal from "../AddPatientModal";
import { Entry, EntryFormValues, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue, addPatient, findPatient, addEntry, resetPatient } from "../state";
import AddEntryModal from "../AddEntryModal";

const PatientListPage: React.FC = () => {
    const [{ patients }, dispatch] = useStateValue();
    const [{ patient }] = useStateValue();

    const [newPatientModalOpen, setNewPatientModalOpen] = React.useState<boolean>(false);
    const [newEntryModalOpen, setNewEntryModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openNewPatientModal = (): void => setNewPatientModalOpen(true);

    const openNewEntryModal = (patient: Patient): void => {
        dispatch(findPatient(patient));
        setNewEntryModalOpen(true);
    };

    const closeNewPatientModal = (): void => {
        setNewPatientModalOpen(false);
        setError(undefined);
    };

    const closeNewEntryModal = (): void => {
        setNewEntryModalOpen(false);
        setError(undefined);
    };

    const submitNewPatient = async (values: PatientFormValues) => {
        try {
            const { data: newPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients`,
                values
            );
            dispatch(addPatient(newPatient));
            closeNewPatientModal();
        } catch (e) {
            console.error(e.response.data);
            setError(e.response.data.error);
        }
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        console.log('values', values);
        try {
            
            const { data: newEntry } = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${patient?.id}/entries`,
                values
            );
            dispatch(addEntry(patient?.id, newEntry));
            closeNewEntryModal();
            dispatch(resetPatient());
        } catch (e) {
            console.error(e.response.data);
            setError(e.response.data.error);
        }
    };

    return (
        <div className="App">
            <Container textAlign="center">
                <h3>Patient list</h3>
            </Container>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Gender</Table.HeaderCell>
                        <Table.HeaderCell>Occupation</Table.HeaderCell>
                        <Table.HeaderCell>Health Rating</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {Object.values(patients).map((patient: Patient) => (
                        <Table.Row key={patient.id}>
                            <Table.Cell>
                                <Link to={`/${patient.id}`}>{patient.name}</Link>
                            </Table.Cell>
                            <Table.Cell>{patient.gender}</Table.Cell>
                            <Table.Cell>{patient.occupation}</Table.Cell>
                            <Table.Cell>
                                <HealthRatingBar showText={false} rating={1} />
                            </Table.Cell>
                            <Table.Cell>
                                <Button onClick={() => openNewEntryModal(patient)}>Add entries</Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <AddPatientModal
                modalOpen={newPatientModalOpen}
                onSubmit={submitNewPatient}
                error={error}
                onClose={closeNewPatientModal}
            />
            <AddEntryModal
                modalOpen={newEntryModalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeNewEntryModal}
            />
            <Button onClick={() => openNewPatientModal()}>Add New Patient</Button>
        </div>
    );
};

export default PatientListPage;
