import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,url,newsUrl,author,date,source} = this.props; // Props are read only 
    return (
      <div>
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}}>
                   {source}</span>
            <img src={!url?"https://cdn.pixabay.com/photo/2015/07/31/22/12/phone-869669_960_720.jpg":url} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}
                
                   </h5>
                <p className="card-text">{description}...</p>
                <p className="card-text">By {!author?"Narendra Patel":author} on {new Date(date).toGMTString()}</p>
                <a rel="noopener noreferrer" href={newsUrl} target="_blank" className="btn btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
// LIFE CYCLE OF REACT COMPONENT 

// MOUNT : 
// UPDATE : 
// UNMOUNT : 

//componentDidMount(),componentDidUpdate(),componentWillUnMount()