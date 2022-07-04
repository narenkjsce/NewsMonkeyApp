import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
//import spinner from "./spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  /* Constructor called whenever object created for news component*/
  constructor(props) {
    super(props); // Always call Super class constructor
    // This is how we define state
    this.state = {
      article: [],
      loading: false,
      page: 1,
      totalResults:0
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
  }
  async updateNews()
  {
    this.props.setProgress(10);
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9d44b967af364acfb74fe14ac3a95cb5&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.setState({loading:true});
    this.props.setProgress(30);
    let ParsedData =  await data.json(); //co=nverting fetch data in json
    // That's how we set the state which is defined at above
    this.props.setProgress(50);
    this.setState({
      article: ParsedData.articles, // this is coming from json
      totalResults: ParsedData.totalResults,
      loading: false
      
    });
    this.props.setProgress(100);
  }
  //This is a life cycle method which gets called after render method
  async componentDidMount() {
    this.updateNews();
  }
  capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  fetchMoreData = async () => {
    this.setState({page:this.state.page +1});
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9d44b967af364acfb74fe14ac3a95cb5&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.setState({loading:true});
  
    let ParsedData =  await data.json(); //co=nverting fetch data in json
    // That's how we set the state which is defined at above
    this.setState({
      article: this.state.article.concat(ParsedData.articles), // this is coming from json
      totalResults: ParsedData.totalResults,
      loading: false
    });
  };
  render() {
    return (
      <div>
        <h1 className="text-center">NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {/* { this.state.loading &&  <Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row my-3">
          {this.state.article.map((element) => {
            // return what you want to display ... with unique key
            return (
              <div className="col-md-4 my-3" key={element.url}>
                 <NewsItem
                  title={element.title ? element.title.slice(0, 30) : ""}
                  description={
                    element.description ? element.description.slice(0, 50) : ""
                  }
                  url={element.urlToImage}
                  newsUrl={element.url}
                  author = {element.author}
                  date={element.publishedAt}
                  source = {element.source.name}
                />
              </div>
            );
          })}
        </div>
        </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
