import React, { useEffect } from 'react'
import { API_CONSTANTS } from '../../constants'
import { connect } from 'react-redux'
import { getAllNews } from './thunks'
import { Grid, Segment, Loader, Dimmer } from 'semantic-ui-react'
import './styles.scss'

function HomePage(props) {
  useEffect(() => {
    props.getAllNews()
  }, [])

  return (
    <div className="HomePage-container">
      <h1>News </h1>
      {props.newsData.status === API_CONSTANTS.loading ? (
        <Dimmer active>
          <Loader>Please wait...</Loader>
        </Dimmer>
      ) : null}
      {props.newsData.status === API_CONSTANTS.success &&
      props.newsData?.data?.length > 0 ? (
        <>
          <Grid>
            {props.newsData?.data?.map((news) => (
              <Grid.Column width={4}>
                <Segment>
                  <img className="news-img" src={news.img} alt="img" />
                  {news.title}
                </Segment>
              </Grid.Column>
            ))}
          </Grid>
          {/* repeating same news */}
          <Grid>
            {props.newsData?.data?.map((news) => (
              <Grid.Column width={4}>
                <Segment>
                  <img className="news-img" src={news.img} alt="img" />
                  {news.title}
                </Segment>
              </Grid.Column>
            ))}
          </Grid>
        </>
      ) : (
        'no news found'
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  newsData: state.HomePage.newsData,
})

const mapDispatchToProps = (dispatch) => ({
  getAllNews: () => dispatch(getAllNews()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
