import styled from 'styled-components';
import GreyText from '../../../components/GreyText';
import { IoLogInOutline, IoCloseCircleOutline } from 'react-icons/io5';

export default function Locations({ locations }) {
  async function chooseActivity(activity) {
    if (activity.capacity === activity.occupation) return;
    console.log(activity.id);
  }

  function formatTime(startAt, duration) {
    const endTime = startAt + duration;

    return `${getHours(startAt)}:${getMinutes(startAt)} - ${getHours(endTime)}:${getMinutes(endTime)}`;
  }

  function getHours(time) {
    return Math.floor(time).toString().padStart(2, '0');
  }

  function getMinutes(time) {
    return ((time * 60) % 60).toString().padStart(2, '0');
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
                    <Activity key={activity.id} height={+activity.duration} onClick={() => chooseActivity(activity)}>
                      <LeftSide>
                        <Name>{activity.name}</Name>
                        <Time>{formatTime(+activity.startAt, +activity.duration)}</Time>
                      </LeftSide>
                      <RightSide>
                        {activity.capacity === activity.occupation ? (
                          <>
                            <IoCloseCircleOutline className="red-icon" />
                            <Number color={'red'}>Esgotado</Number>
                          </>
                        ) : (
                          <>
                            <IoLogInOutline className="green-icon" />
                            <Number color={'green'}>{`${activity.capacity - activity.occupation} vagas`}</Number>
                          </>
                        )}
                      </RightSide>
                    </Activity>
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

const Activity = styled.div`
  width: 265px;

  grid-row: ${(props) => (props.height ? `span ${4 * props.height}` : 'span 4')};

  padding: 10px 2px 10px 10px;
  margin-bottom: 10px;

  display: flex;

  background: #f1f1f1;

  border-radius: 5px;

  cursor: pointer;
`;

const LeftSide = styled.div`
  width: 189px;

  border-right: 1px solid #cfcfcf;
`;

const Name = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  color: #343434;
`;

const Time = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #343434;

  margin-top: 7px;
`;

const RightSide = styled.div`
  width: 64px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-left: 1px solid #cfcfcf;

  .green-icon {
    font-size: 20px;
    color: #078632;

    margin-right: 5px;
  }

  .red-icon {
    font-size: 20px;
    color: #cc6666;

    margin-right: 5px;
  }
`;

const Number = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 9px;
  color: ${(props) => (props.color === 'green' ? '#078632' : '#CC6666')};
  margin-top: 3px;
`;
