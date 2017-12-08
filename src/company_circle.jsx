import React from "react";


class Company extends React.Component {
  constructor(props){
    super(props);
    this.radius = Math.sqrt((this.props.scale * 400000)/Math.PI);
    this.innerRadius = Math.sqrt(((this.props.scale * 400000) / this.props.pb)/Math.PI);
  }



  render(){
    if (this.props.inner) {
      return (
        <circle className="inner-company-orb"
          cx={`${this.props.x}`}
          cy={`${this.props.y}`}
          r={`${this.innerRadius}`}
          />
      );
    } else {
      return (
        <circle className="company-orb"
          cx={`${this.props.x}`}
          cy={`${this.props.y}`}
          r={`${this.radius}`}
          />
      );
    }
  }
}

export default Company;
