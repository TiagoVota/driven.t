import styled from 'styled-components';

import { formatTime } from '../../../utils/timeFormat';
import ActivityStatus from './ActivityStatus';

export default function Activity({ activityInfo, isSelected, onClick }) {
  const {
    name,
    startAt,
    duration,
    capacity,
    occupation,
  } = activityInfo;

  return (
    <Container height={+duration} isSelected={isSelected} onClick={onClick}>
      <LeftSide>
        <Name>
          {name}
        </Name>

        <Time>
          {formatTime(+startAt, +duration)}
        </Time>
      </LeftSide>

      <ActivityStatus
        isSelected={isSelected}
        vacancy={capacity - occupation}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 265px;

  grid-row: ${(props) => (props.height ? `span ${4 * props.height}` : 'span 4')};

  padding: 10px 2px 10px 10px;
  margin-bottom: 10px;

  display: flex;

  background: ${p => p.isSelected ? '#D0FFDB' : '#F1F1F1'};

  border-radius: 5px;

  cursor: pointer;
`;

const LeftSide = styled.div`
  width: 189px;

  border-right: 1px solid #CFCFCF;
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
