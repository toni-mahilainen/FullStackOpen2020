import React from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue } from "../state";
import { Header, Container, Icon, List, Label } from "semantic-ui-react";
import axios from 'axios';
import { Patient } from '../types';

import { apiBaseUrl } from "../constants";
import GenderIcon from './GenderIcon';

const PatientInfoPage: React.FC = () => {
    const [{ patient }, dispatch] = useStateValue();

    const { id } = useParams<{ id: string }>();

    React.useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

                dispatch({ type: 'FIND_PATIENT', payload: { patient: response.data } });
            } catch (error) {
                console.error(error);
            }
        };
        fetchPatient();
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