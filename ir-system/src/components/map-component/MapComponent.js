import React from "react";
import axios from "axios";
import constants from '../../config/constants';
import dataStructure from "./data_structure.js";
import countriesMapping from "./countries_mapping.js";
import { ResponsiveChoropleth } from "@nivo/geo";
import countries from "./world_countries.json";

class MapComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      max: 0,
    };
  }


  componentDidMount() {
    dataStructure.forEach(datum => {
      let name;
      countriesMapping.forEach(mapping => {
        if (mapping.alpha3 === datum.id) {
          name = mapping.name;
        }
      })
      const body = {
        "query": {
            "multi_match": {
                "query": name,
                "fields": [
                    "title",
                    "text",
                    "entities.locations.name",
                    "entities.organizations.name",
                    "entities.persons.name"
                ]
            }
        }
      };
      axios.post(constants.news_articles_count_url, body).then(res => 
        this.setState({
          data: [
            ...this.state.data,
            {
              id: datum.id,
              value: res.data.count,
            }
          ],
          max: res.data.count > this.state.max ? res.data.count : this.state.max,
        })
      )
    })
  }

  render() {
    return (
        <ResponsiveChoropleth
          data={this.state.data}
          features={countries.features}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          colors="nivo"
          domain={[ 0, this.state.max ]}
          unknownColor="#666666"
          label="properties.name"
          valueFormat=".2s"
          projectionTranslation={[ 0.5, 0.5 ]}
          projectionRotation={[ 0, 0, 0 ]}
          enableGraticule={true}
          graticuleLineColor="#dddddd"
          borderWidth={0.5}
          borderColor="#152538"
          legends={[
              {
                  anchor: 'bottom-left',
                  direction: 'column',
                  justify: true,
                  translateX: 20,
                  translateY: -100,
                  itemsSpacing: 0,
                  itemWidth: 94,
                  itemHeight: 18,
                  itemDirection: 'left-to-right',
                  itemTextColor: '#444444',
                  itemOpacity: 0.85,
                  symbolSize: 18,
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemTextColor: '#000000',
                              itemOpacity: 1
                          }
                      }
                  ]
              }
          ]}
      />
    );
  }
}

export default MapComponent;