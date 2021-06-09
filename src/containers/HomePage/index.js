import React, { useState, useEffect } from 'react'
import { API_CONSTANTS } from '../../constants'
import { connect } from 'react-redux'
import { getDataFromApi } from './thunks'
import {
  Grid,
  Segment,
  Loader,
  Dimmer,
  Input,
  Pagination,
  Button,
} from 'semantic-ui-react'
import './styles.scss'

function HomePage(props) {
  const [searchQuery, setSearchQuery] = useState('trees')
  const [page, setPage] = useState(1)
  useEffect(() => {
    props.getDataFromApi({ query: searchQuery, page: page })
  }, [])

  const onChangeSearchInput = (e, { value }) => {
    setSearchQuery(value)
  }

  // setting active page
  const handlePaginationChange = (e, { activePage }) => {
    setPage(activePage)
    props.getDataFromApi({ query: searchQuery, page: activePage })
  }

  const searchImage = () => {
    props.getDataFromApi({ query: searchQuery, page: page })
  }
  return (
    <div className="HomePage-container">
      <div className="header-session">
        <div className="title">Image Finder </div>
        <div className="search">
          <Input
            onChange={onChangeSearchInput}
            value={searchQuery}
            placeholder="Search Images..."
          />
          <Button onClick={searchImage}>Search Image</Button>
        </div>
      </div>

      {props.data.status === API_CONSTANTS.loading ? (
        <Dimmer active>
          <Loader>Please wait...</Loader>
        </Dimmer>
      ) : null}
      {props.data.status === API_CONSTANTS.success &&
      props.data?.data?.photos?.length > 0 ? (
        <>
          <Grid>
            {props.data?.data?.photos?.map((item) => (
              <Grid.Column computer={4} mobile={16}>
                <Segment className="cards">
                  <img className="api-img" src={item.src?.large} alt="img" />
                  <p>By:{item.photographer}</p>
                </Segment>
              </Grid.Column>
            ))}
            {props.data?.data?.total_results > 40 ? (
              <div>
                <Pagination
                  className="pagination"
                  boundaryRange={0}
                  activePage={page}
                  ellipsisItem={null}
                  firstItem={1}
                  onPageChange={handlePaginationChange}
                  lastItem={parseInt(props.data?.data?.total_results / 40)}
                  siblingRange={1}
                  totalPages={parseInt(props.data?.data?.total_results / 40)}
                />
              </div>
            ) : null}
          </Grid>
        </>
      ) : (
        <div className="no-image">
          {' '}
          <img
            className="err-img"
            src="https://image.freepik.com/free-vector/no-data-concept-illustration_114360-695.jpg"
            alt="no data"
          />{' '}
          <br /> No images found!{' '}
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  data: state.HomePage.data,
})

const mapDispatchToProps = (dispatch) => ({
  getDataFromApi: (data) => dispatch(getDataFromApi(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
