import React from 'react';
import { useParams } from 'react-router-dom';
import { Header, Container, List, Label } from "semantic-ui-react";
import axios from 'axios';

import { apiBaseUrl } from "../constants";
import GenderIcon from './GenderIcon';
import { useStateValue, findPatient } from "../state";
import { Patient } from '../types';

const PatientInfoPage: React.FC = () => {
    const [{ patient }, dispatch] = useStateValue();

    const { id } = useParams<{ id: string }>();

    React.useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

                dispatch(findPatient(response.data));
            } catch (error) {
                console.error(error);
            }
        };

        if (patient?.id !== id) {
            fetchPatient();
        }
    }, [id]);

    return (
        <Container >
            <Header as='h1'>{patient?.name}</Header>
            {patient ? <GenderIcon gender={patient.gender} /> : null}
            <List>
                <List.Item>
                    <Label color='pink' horizontal>
                        SSN:
                    </Label>
                    {patient?.ssn}
                </List.Item>
                <List.Item>
                    <Label color='pink' horizontal>
                        Occupation:
                    </Label>
                    {patient?.occupation}
                </List.Item>
            </List>
        </Container>
    );
};

export default PatientInfoPage;