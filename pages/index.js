import Head from 'next/head'
import { Col, Row } from 'antd'
import { useGenreList } from 'hooks/genre'
import { useMyList } from 'hooks/mylist'
import PageHeader from 'components/PageHeader'
import MoviesGenre from 'components/MoviesGenre'
import MyMovieList from 'components/MyMovieList'

export default function Home() {
  const genreList = useGenreList()
  const myList = useMyList()

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageHeader />
      <Container>
        <MyMovieList myList={myList} />

        {genreList?.data?.map((genre) => (
          <MoviesGenre
            key={genre?.id}
            genreName={genre?.name}
            genreId={genre?.id}
            myList={myList}
          />
        ))}
      </Container>
    </div>
  )
}

function Container({ children }) {
  return (
    <Row style={{ marginLeft: '1em', marginRight: '1em', marginTop: '200px' }}>
      <Col span={24}>
        {children}
      </Col>
    </Row>
  )
}
