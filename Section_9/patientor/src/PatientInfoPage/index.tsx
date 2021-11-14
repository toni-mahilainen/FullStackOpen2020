import React from "react";
import { useParams } from "react-router-dom";
import { Header, Container, List, Label } from "semantic-ui-react";
import axios from "axios";

import { apiBaseUrl } from "../constants";
import GenderIcon from "./GenderIcon";
import { useStateValue, findPatient } from "../state";
import { Patient } from "../types";
import Entries from "./Entries";

const PatientInfoPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  const [{ diagnoses }] = useStateValue();

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        dispatch(findPatient(response.data));
      } catch (error) {
        console.error(error);
      }
    };

    if (patient?.id !== id) {
      fetchPatient();
    }
  }, [id, patient, dispatch]);

  return (
    <>
      {patient ? (
        <Container>
          <Header as="h1"> {patient.name}</Header>
          <GenderIcon gender={patient.gender} />
          <List>
            <List.Item>
              <Label color="pink" horizontal>
                SSN:
              </Label>
              {patient?.ssn}
            </List.Item>
            <List.Item>
              <Label color="pink" horizontal>
                Occupation:
              </Label>
              {patient.occupation}
            </List.Item>
          </List>
          <Header as="h3">Entries</Header>
          <Entries entriesData={patient.entries} diagnoses={diagnoses} />
        </Container>
      ) : null}
    </>
  );
};

export default PatientInfoPage;
