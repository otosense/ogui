import {
  type PaginationOptions,
  type SessionFilterOptions,
  type SessionSortOptions,
  type Operator,
  type Optional,
  type Session
} from './types'

const mockAnnotations = (start: number, stop: number, step: number, tag: number): Session['annotations'] => {
  const annotations = []
  let t = 1
  for (let i = start; i < stop; i += step) {
    annotations.push({
      name: `tag${t}`,
      bt: i,
      tt: i + step
    })
    t = t % tag + 1
  }
  return annotations
}

const mockSessionGen = (n = 10): Session[] => {
  const sessions = []
  const timeStep = 600000000
  const sampleRates = [44100, 48000]
  for (let i = 0; i < n; i++) {
    const bt = 1677672000000000 + (i * timeStep)
    const tt = 1677672000000000 + ((i + 1) * timeStep)
    const channels = []
    for (let j = 0; j < i % 4 + 1; j++) {
      channels.push(
        {
          name: `ch${j}`,
          description: 'microphone'
        }
      )
    }
    sessions.push(
      {
        id: `mockSession${i}`,
        device_id: `deviceId${i % 2 + 1}`,
        bt,
        tt,
        sr: sampleRates[i % 2],
        bit_depth: 8,
        channels,
        annotations: mockAnnotations(bt, tt, timeStep / 10, i % 5 + 1)
      }
    )
  }
  return sessions
}

const mockSessions: Session[] = mockSessionGen(100)

const filterByNamesOperator = (names: string[], operator: Operator, namedList: Array<{ name: string }>): boolean => {
  if (operator === 'and' && !names.every((includeName) => namedList.some(({ name }) => name === includeName))) {
    return false
  } else if (operator === 'or' && !namedList.some(({ name }) => names.includes(name))) {
    return false
  }
  return true
}

const filterSessions = (f: SessionFilterOptions, sessions = mockSessions): Session[] => {
  // partially implemented for testing
  const _sessions = [...sessions]
  return _sessions.filter((s) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { from_bt, to_bt, from_tt, to_tt, sr, channels, annotations } = f
    if (from_bt != null && s.bt < from_bt) {
      return false
    }
    if (to_bt != null && s.bt > to_bt) {
      return false
    }
    if (from_tt != null && s.tt < from_tt) {
      return false
    }
    if (to_tt != null && s.tt > to_tt) {
      return false
    }
    if (sr != null && s.sr !== sr) {
      return false
    }
    if (channels != null && !filterByNamesOperator(channels.names, channels.operator, s.channels)) {
      return false
    }
    if (annotations != null && !filterByNamesOperator(annotations.names, annotations.operator, s.annotations)) {
      return false
    }
    return true
  })
}

const sortSessions = (sort: SessionSortOptions, sessions: Session[]): Session[] => {
  let _sessions = [...sessions]
  if (_sessions?.length > 0) {
    if (sort.field === 'device_id') {
      if (sort.mode === 'asc') {
        _sessions = _sessions.sort((a, b) => a.device_id?.localeCompare(b.device_id ?? '') ?? 0)
      } else {
        _sessions = _sessions.sort((b, a) => a.device_id?.localeCompare(b.device_id ?? '') ?? 0)
      }
    } else {
      if (sort.mode === 'asc') {
        _sessions = _sessions.sort((a, b) => {
          const x = a[sort.field] as number
          const y = b[sort.field] as number
          return x - y
        })
      } else {
        _sessions = _sessions.sort((b, a) => {
          const x = a[sort.field] as number
          const y = b[sort.field] as number
          return x - y
        })
      }
    }
  }
  return _sessions
}

export const listSessions = (
  filter: Optional<SessionFilterOptions> = null,
  sort: Optional<SessionSortOptions> = null,
  pagination: Optional<PaginationOptions> = null,
  sessions: Session[] = mockSessions
): Session[] => {
  let s = (filter != null) ? filterSessions(filter, sessions) : [...sessions]
  if (sort != null) {
    s = sortSessions(sort, s)
  }
  if (pagination != null) {
    s = s.slice(pagination.from_idx, pagination.to_idx)
  }
  return s
}
