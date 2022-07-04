import "./App.css";
import React, { Component } from "react";
import Navbar from "./Component/Navbar";
import News from "./Component/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import LoadingBar from 'react-top-loading-bar'
export default class App extends Component {
   PageSize = 15;
   state = { progress:0}
   setProgress = (progress)=>{
    this.setState({progress :progress});
   }
  render() {
    return (
      <div>
        <Router>
        <Fragment>
          <Navbar />
          <LoadingBar
          height={3}
              color='#f11946'
              progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)
        // }
         />
          {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            {/*To render the new component based on click events we have to use unique key in our component*/}
          <Routes>
            <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={this.PageSize} country="in" category="business" />} />
            <Route exact path="/entertainment"element={<News setProgress={this.setProgress} key="entertainment" pageSize={this.PageSize} country="in" category="entertainment" />}/>           
            <Route exact path="/general"element={<News setProgress={this.setProgress} key="general" pageSize={this.PageSize} country="in" category="general" />}/>
            <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={this.PageSize} country="in" category="health" />}/>
            <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={this.PageSize} country="in" category="science" />}/>
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={this.PageSize} country="in" category="sports" />}/>
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={this.PageSize} country="in" category="technology" />}/>
          </Routes>
          </Fragment>
        </Router>
      </div>
    );
  }
}
