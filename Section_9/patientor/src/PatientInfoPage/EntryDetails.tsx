import React from 'react';
import { Divider, Header, Icon, Label, List, Segment } from 'semantic-ui-react';
import { Entry, HealthIconColor } from '../types';
import { assertNever } from '../utils';

interface Props {
    entry: Entry;
    diagnosisCodes: JSX.Element[] | undefined;
}

const EntryDetails: React.FC<Props> = ({ entry, diagnosisCodes }) => {
    switch (entry.type) {
        case 'HealthCheck':
            let healthIconColor: HealthIconColor = undefined;
            switch (entry.healthCheckRating) {
                case 0:
                    healthIconColor = 'green';
                    break;

                case 1:
                    healthIconColor = 'yellow';
                    break;

                case 2:
                    healthIconColor = 'red';
                    break;

                case 3:
                    healthIconColor = 'black';
                    break;

                default:
                    healthIconColor = undefined;
            }

            return (
                <Segment>
                    <Header as='h4'>{entry.specialist}</Header>
                    <Label color='pink'>{entry.date}</Label>{' '}
                    <Icon name='stethoscope' size='big'></Icon>{' '}
                    <Icon name='heart' size='big' color={healthIconColor}></Icon>
                    <Divider />
                    <p>{entry.description}</p>
                    <List bulleted verticalAlign='middle'>
                        {diagnosisCodes}
                    </List>
                </Segment>
            );

        case 'Hospital':
            const discharge = entry.discharge ?
                <>
                    <Divider />
                    <Header as='h4'>Discharge</Header>
                    <List>
                        <List.Item>
                            <Label color='pink'>Date</Label>{' '}
                            <span>{entry.discharge.date}</span>
                        </List.Item>
                        <List.Item>
                            <Label color='pink'>Criteria</Label>{' '}
                            <span>{entry.discharge.criteria}</span>
                        </List.Item>
                    </List>
                </> : null;
            return (
                <Segment>
                    <Header as='h4'>{entry.specialist}</Header>
                    <Label color='pink'>{entry.date}</Label>{' '}
                    <Icon name='hospital' size='big'></Icon>
                    <Divider />
                    <p>{entry.description}</p>
                    <List bulleted verticalAlign='middle'>
                        {diagnosisCodes}
                    </List>
                    {discharge}
                </Segment>
            );

        case 'OccupationalHealthcare':
            const sickLeave = entry.sickLeave ?
                <>
                    <Divider />
                    <Header as='h4'>Sick leave</Header>
                    <List>
                        <List.Item>
                            <Label color='pink'>Start</Label>{' '}
                            <span>{entry.sickLeave.startDate}</span>
                        </List.Item>
                        <List.Item>
                            <Label color='pink'>End</Label>{' '}
                            <span>{entry.sickLeave.startDate}</span>
                        </List.Item>
                    </List>
                </> : null;

            return (
                <Segment>
                    <Header as='h4'>{entry.specialist}</Header>
                    <Label color='pink'>{entry.date}</Label>{' '}
                    <Icon name='user md' size='big'></Icon>
                    <Label basic>{entry.employerName}</Label>
                    <Divider />
                    <p>{entry.description}</p>
                    <List bulleted verticalAlign='middle'>
                        {diagnosisCodes}
                    </List>
                    {sickLeave}
                </Segment>
            );

        default:
            return assertNever(entry);
    }
};

export default EntryDetails;