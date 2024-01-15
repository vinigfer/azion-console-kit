import { AxiosHttpClientAdapter, parseHttpResponse } from '../axios/AxiosHttpClientAdapter'
import { makeWafRulesAllowedBaseUrl } from './make-waf-rules-allowed-base-url'

export const listWafRulesAllowedService = async ({ id }) => {
  let httpResponse = await AxiosHttpClientAdapter.request({
    url: `${makeWafRulesAllowedBaseUrl()}/${id}/allowed_rules?page=1&page_size=100`,
    method: 'GET'
  })

  httpResponse = adapt(httpResponse)

  return parseHttpResponse(httpResponse)
}

const parseStatusData = (status) => {
  const parsedStatus = status
    ? {
        content: 'Active',
        severity: 'success'
      }
    : {
        content: 'Inactive',
        severity: 'danger'
      }

  return parsedStatus
}

const replaceString = (str, value) => {
  return str.replace('$value', value)
}

const parseMatchZone = (waf) => {
  const arrayMatchZone = []

  const zones = {
    query_string: 'Query String$value',
    raw_body: 'Raw Body',
    request_body: 'Request Body$value',
    request_header: 'Request Header$value',
    path: 'Path',
    file_name: 'File Name (Multipart Body)',
    conditional_request_header: 'Conditional Request Header$value',
    conditional_request_body: 'Conditional Request Body$value',
    conditional_query_string: 'Conditional Query String$value'
  }

  let value = ''
  for (const matchZone of waf) {
    value = zones[matchZone.zone]
    if (matchZone.zone_input) {
      if (matchZone.matches_on === 'value')
        value = replaceString(value, `: ${matchZone.zone_input} (Value)`)
      if (matchZone.matches_on === 'name')
        value = replaceString(value, `: ${matchZone.zone_input} (Name)`)
    } else if (matchZone.matches_on) {
      if (matchZone.matches_on === 'value') value = replaceString(value, ' (Value)')
      if (matchZone.matches_on === 'name') value = replaceString(value, ' (Name)')
    }

    arrayMatchZone.push(value)
  }

  return arrayMatchZone
}

const adapt = (httpResponse) => {
  /**
   * Necessary until the API gets the common pattern
   * of returning the array of data inside results property
   * like other andpoints.
   */

  const isArray = Array.isArray(httpResponse.body.results)

  const parsedWafRulesAllowed = isArray
    ? httpResponse.body.results.map((waf) => {
        const parsedAllowed = {
          id: waf.id,
          lastEditor: waf.last_editor,
          lastModified: new Intl.DateTimeFormat('us', { dateStyle: 'full' }).format(
            new Date(waf.last_modified)
          ),
          matchZones: parseMatchZone(waf.match_zones),
          matchesOn: waf.matches_on,
          zone: waf.zone,
          zoneInput: waf.zone_input,
          path: waf.path,
          reason: waf.reason,
          ruleId: waf.rule_id === 0 ? '0 - All Rules' : waf.rule_id,
          status: parseStatusData(waf.status),
          useRegex: waf.use_regex
        }

        return parsedAllowed
      })
    : []

  return {
    body: parsedWafRulesAllowed,
    statusCode: httpResponse.statusCode
  }
}
