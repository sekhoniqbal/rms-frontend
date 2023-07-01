export default function OverviewCard({fetching, error, data, heading, icon, className}){
    return (
        <div className={`overview-card ${className}`}>
          <div className="card--data">
            <div className="card--content">
              <h5 className="card--title">{heading}</h5>
              <h1>
                {fetching ? <div>loading...</div>
                  : error ? <div>0</div>
                    : !data || data.length === 0 ? <div>0</div>
                      : data.length
                }
              </h1>
            </div>
            <i className={`ri-${icon} card--icon--lg`}></i>
          </div>
        </div>
    )
}