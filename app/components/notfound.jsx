import React from 'react'
var createReactClass = require('create-react-class');

var notfound = createReactClass({
  render() {
    return <section id="main-content">
               <div className="content-title">
                  <h3 className="main-title">Not Found</h3>
                  <span>Page is not available</span>
               </div>
               <div className="inner-content">
                  <div className="panel theme-panel">
                     
                     <div className="panel-body">
                        <div className="row clearfix">
                           <img className="width-full" src="/assets/images/404.png" alt="..." />
                        </div>
                     </div>
                  </div>
               </div>
            </section>
  }
});

export default notfound;
