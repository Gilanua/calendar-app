import React, {Component} from 'react'
import {CalendarIcon, ClockIcon, LinkIcon, PlaceholderIcon} from '../Icons'
import styled from 'styled-components'
import {getHumanDate} from '../../utils/date'

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-flow: row wrap;
  margin-left: -15px;
`
const Item = styled.li`
  width: 50%;
  display: flex;
  @media (max-width: 666px) {
    width: 100%;
  }
`
const ItemInner = styled.div`
  background-color: #fff;
  margin-bottom: 15px;
  border-radius: 3px;
  padding: 15px;
  padding-bottom: 5px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.2);
  position: relative;
  width: 100%;
  margin-left: 15px;
`
const Name = styled.div`
  margin-bottom: 10px;
  line-height: 1;
  font-family: Helvetica;
  font-size: 28px;
  color: #e15345;
`
const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 16px;
  padding-right: 37px;
  span {
    margin-left: 10px;
  }
  &:nth-child(3) {
    padding-right: 0;
  }
`
const Link = styled.a`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
`
class Events extends Component {
  state = {
    events: [],
  }

  componentDidMount = props => {
    this.updateEvents(props)
  }

  componentWillReceiveProps = nextProps => {
    this.updateEvents(nextProps)
  }

  updateEvents = props => {
    const {entries, country, city} = props || this.props
    let list = this.filterEvents(entries, country, 'country')
    list = this.filterEvents(list, city, 'city')
    this.setState({
      events: list,
    })
  }

  filterEvents = (arr, value = '', type = 'city') => {
    const list = arr.filter(function(item) {
      if (type) {
        return item.location[type].toLowerCase().search(value.toLowerCase()) !== -1
      }
      return item
    })
    return list
  }

  render() {
    const {events} = this.state
    return (
      <List>
        {events.map((el, key) => (
          <Item key={key}>
            <ItemInner>
              <Name>{el.name}</Name>
              <Row>
                <PlaceholderIcon />
                <span>
                  {el.location.city}, {el.location.country}
                </span>
              </Row>
              <Row>
                <CalendarIcon />
                <span>
                  {getHumanDate(el.date.start)}
                  {el.date.end ? ` — ${getHumanDate(el.date.end)}` : ''}
                </span>
              </Row>
              {el.time.start ? (
                <Row>
                  <ClockIcon />
                  <span>
                    {el.time.start}
                    {el.time.end ? ` — ${el.time.end}` : ''}
                  </span>
                </Row>
              ) : (
                ''
              )}

              <Link target="_blank" href={el.link}>
                <LinkIcon />
              </Link>
            </ItemInner>
          </Item>
        ))}
      </List>
    )
  }
}

export default Events
