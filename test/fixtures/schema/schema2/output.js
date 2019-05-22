/* babel-plugin-inline-import './example3.schema' */
var schema = {
  "type": "object",
  "description": "a_0",
  "properties": {
    "carouselWrapper": {
      "type": "object",
      "description": "b",
      "properties": {
        "children": {
          "type": "array",
          "description": "c$remark=d",
          "properties": {
            "children": {
              "type": "object",
              "description": "e",
              "properties": {
                "href": {
                  "type": "string",
                  "description": "f"
                },
                "target": {
                  "type": "enum",
                  "description": "g",
                  "items": [{
                    "label": "h",
                    "value": "_blank"
                  }, {
                    "label": "i",
                    "value": "_self"
                  }]
                },
                "title": {
                  "type": "object",
                  "description": "j",
                  "properties": {
                    "children": {
                      "type": "string",
                      "description": "k"
                    }
                  }
                },
                "children": {
                  "type": "string",
                  "description": "l"
                }
              }
            }
          }
        }
      }
    }
  }
};
