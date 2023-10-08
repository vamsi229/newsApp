import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export class News extends Component {
    
    static defaultProps = {
        country: 'in',
        pageSize: 9,
        category: 'general'
    }   
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    articles = [{
        "source": {
            "id": null,
            "name": "The Indian Express"
        },
        "author": "Sreenivas Janyala",
        "title": "Chandrababu arrest: All 21 TDP MLAs under house arrest in Andhra clampdown",
        "description": "Jagan govt seeks to question Chandrababu Naidu in another 'scam', related to Amaravati road",
        "url": "https://indianexpress.com/article/political-pulse/tdp-ysrcp-jagan-state-bandh-naidu-arrest-8934925/",
        "urlToImage": "https://images.indianexpress.com/2023/09/jagan-chandrababu.jpg",
        "publishedAt": "2023-09-11T10:50:13Z",
        "content": "Defying heavy police deployment and Section 144 of CrPC prohibiting the assembly of people, the Telugu Desam Party (TDP) workers and supporters held demonstrations in different parts of the YSRCP-rul… [+7363 chars]"
    }]

    capitalizeFirstLetter = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    constructor(props){
        super(props);
        console.log("Hi I am News constructor")
        this.state = {'articles': this.articles, loading: true}
        document.title = this.capitalizeFirstLetter(this.props.category) + ' - NewsMonkey'
        
    }
    
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=67deca7767ad40dc9e6fb2ed917985e8&pageSize=${this.props.pageSize}`
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({articles: parsedData.articles, page: 1, totalResults: parsedData.totalResults, loading:false})
    }
    handlePrevClick = async () => {
        this.setState({loading:true})
        console.log(this.state.page)    
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=67deca7767ad40dc9e6fb2ed917985e8&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({articles: parsedData.articles, page: this.state.page - 1, loading:false})
        
        }
        handleNextClick = async () => {
            if(this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageSize)){}
            else{
        console.log(this.state.page)  
        this.setState({loading:true})  
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=67deca7767ad40dc9e6fb2ed917985e8&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({articles: parsedData.articles, page: this.state.page + 1, loading:false})
        }
        } 
     
  render() {
    return (
      <div className="container my-3">
        {this.state.loading&&<Spinner/>}
        <h2 className='text-center mx-4 my-5'>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
        <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{return <div className="col-md-4">
                <NewsItem title={element.title} description={element.description} url={element.url} urlToImage={element.urlToImage} 
                author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>})}
            
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<2} type="button" class="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Previous</button>
        <button disabled = {this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageSizr)} type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>
        </div>
      </div>
    )
  }
}

export default News
