import React from 'react';
import { Container, Label, List } from 'semantic-ui-react';
import { Entry } from '../types';

interface Props {
    entriesData: Entry[];
}

const Entries: React.FC<Props> = ({ entriesData }) => {
    const entries = entriesData.map(entry => {
        const diagnosisCodes =
            entry.diagnosisCodes ?
                entry.diagnosisCodes.map(code =>
                    <List.Item key={code}>
                        <Label color='green' size='mini'>{code}</Label>
                    </List.Item>
                ) : null;

        return (
            <Container Container key={entry.id} >
                <Label color='pink'>{entry.date}</Label>{' '}
                <span>{entry.description}</span>
                <List bulleted verticalAlign='middle'>
                    {diagnosisCodes}
                </List>
            </Container>
        );
    });

    return (
        <Container>
            {entries}
        </Container>
    );
}

export default Entries;