import styled from 'styled-components';

import GreyText from '../../../components/GreyText';
import Activity from './Activity';

export default function Locations({ locations }) {
  async function chooseActivity(activity) {
    if (activity.capacity <= activity.occupation) return;
    console.log(activity.id);
  }

  if (!locations) {
    return <></>;
  }

  return (
    <Container>
      {locations.map((location) => {
        return (
          <Location key={location.id}>
            <GreyText>{location.name}</GreyText>
            <LocationContainer>
              <GridContainer>
                {location.Activity.map((activity) => {
                  return (
                    <Activity
                      key={activity.id}
                      activityInfo={activity}
                      isSelected={[].includes(activity.id)}
                      onClick={() => chooseActivity(activity)}
                    />
                  );
                })}
              </GridContainer>
            </LocationContainer>
          </Location>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  width: 864px;

  margin-top: 58px;

  display: flex;
`;

const Location = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LocationContainer = styled.div`
  width: 288px;
  height: 392px;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 10px 0;

  margin-top: 15px;
  margin-left: -1px;

  border: 1px solid #d7d7d7;
`;

const GridContainer = styled.div`
  height: 100%;

  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: dense;
  grid-auto-rows: 20px;

  overflow: auto;
`;
