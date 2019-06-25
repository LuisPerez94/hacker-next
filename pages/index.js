import { Component } from 'react';
import Error from 'next/error';
import fetch from 'isomorphic-fetch';
import Link from 'next/link';
import Layout from '../components/Layout';
import StoryList from '../components/StoryList';

class Index extends Component {

  static async getInitialProps({ req, res, query }){
    let stories;
    let page;
    try {
      page = Number(query.page) || 1;
      const response = await fetch(`https://node-hnapi.herokuapp.com/news?page=${page}`);
      stories = await response.json();
    } catch (error) {
      console.log(error);
      stories = [];
    }

    return { stories, page };
  }

  render() {
    const { stories, page } = this.props;
    if (stories.length === 0) {
      return <Error statusCode={503} />
    }
    return(
      <Layout title="Hacker Next" description="A Hacker News clone made with Next">
        <StoryList stories={stories} />
        <footer>
          <Link href={`/?page=${page + 1}`}>
            <a>Siguiente página ({page + 1})</a>
          </Link>
        </footer>
      </Layout>
    );
  }
}

export default Index;