const MAX_HINT_QTY = 5;

const TEMPLATE = `
          {% if object.features.length > ${MAX_HINT_QTY} %}
            Click to zoom in and see the details
          {% else %}
            <div style="padding: 5px">
            {% for geoObject in object.features %} 
              {% if geoObject.properties.many %}
                {% for title in geoObject.properties.titles %}
                  - {{ title }}<br/>
                {% endfor %}
              {% else %}
                - {{ geoObject.properties.hintContent }}<br/>
              {% endif %}
            {% endfor %}
            </div>
          {% endif %}
        `;

export default TEMPLATE;