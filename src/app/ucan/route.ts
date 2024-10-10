import * as Client from '@web3-storage/w3up-client'
import { StoreMemory } from '@web3-storage/w3up-client/stores/memory'
import * as Proof from '@web3-storage/w3up-client/proof'
import { Signer } from '@web3-storage/w3up-client/principal/ed25519'
import * as DID from '@ipld/dag-ucan/did'

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function POST(req: Request) {
  const pastedProof = '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qKM2mU3toJb1anmhrdKSR9+tIQVctZd6IDGF2ZTAuOS4xY2F0dIGiY2NhbmEqZHdpdGh4OGRpZDprZXk6ejZNa3ZEcDlmMXFZOHRQbUdlazg2MXF5QUdFSFRSQmdDUUJ6YXljUG9kQ015NU1DY2F1ZFedGm1haWx0bzpkaGFwcHkub3JnOmR5c2NleHD2Y2ZjdIGhZXNwYWNloWRuYW1lbVBhcnR5IE1vYnN0ZXJjaXNzWCLtAepJKQXiOKyDz7qMXXdoZbCv3uLeXxD4poer/J2Fb2UDY3ByZoClAgFxEiD1vZJ2yEA/a2tqhLt0oIB3efyzCal4mcyv4AvHWlhGGqhhc1hE7aEDQJOnDmNolUrr3TlSa6B0TujYlSGKhi/fpeKufA5vDkTMWU8UEignB66GgMq7AZNtApdk6CREC+nrsji2uUndOg1hdmUwLjkuMWNhdHSBomNjYW5hKmR3aXRoeDhkaWQ6a2V5Ono2TWtxeld0MkNTemdDM25ubmt1ekM1S3Q0VFlFN0dYbTFLalR1WlprcWZjOTE5UmNhdWRXnRptYWlsdG86ZGhhcHB5Lm9yZzpkeXNjZXhw9mNmY3SBoWVzcGFjZaFkbmFtZWRtYWluY2lzc1gi7QGrclXTzbNpmADX7sF/aPnY47gcOEuvjn5Fjnu2KVfhmGNwcmaAqQIBcRIgALk3nbzVdbzPqRpBD3Z5f+c8ztzXm/ZG9EbCabIhU1GoYXNYRO2hA0Ad8gwe6L9DWUp6b3D6W130zm6xe3z50qSFVozU3QQ1DassRDv9J1lOSSA94iH0kJkqx4hvukvxwt9lfoNWcwQDYXZlMC45LjFjYXR0gaJjY2FuYSpkd2l0aHg4ZGlkOmtleTp6Nk1rcWhZeVpxc0JzNVRMS2JNWlQ5RjFBdEhvcTJFNndWcmhMeWpBMmVvUnRpNFdjYXVkV50abWFpbHRvOmRoYXBweS5vcmc6ZHlzY2V4cPZjZmN0gaFlc3BhY2WhZG5hbWVoTWV0YUdhbWVjaXNzWCLtAacZ1L4vyHA3orSEOg8b7HdaoNJCg5cg9P98geHsFKSHY3ByZoCLAwFxEiBTSl6E5Uu+5Yeaym2lsqJbaXWZ5vKzVuJzwVxHEbZc9qhhc0SAoAMAYXZlMC45LjFjYXR0gaJjY2FuYSpkd2l0aGZ1Y2FuOipjYXVkWCLtAaY5UIzjdynMIld+v6Y+xkKN9zazgifNaUMfBtNlc4+yY2V4cPZjZmN0gaJuYWNjZXNzL2NvbmZpcm3YKlglAAFxEiCDC8yYkK4/ZniSdh86gNLPR1oyiuXZa4bKOjtMJxKddG5hY2Nlc3MvcmVxdWVzdNgqWCUAAXESIHQpBySm8Y9D2bKWerdLHmFF8+2IOdFFeSRUJecPXvtYY2lzc1edGm1haWx0bzpkaGFwcHkub3JnOmR5c2NwcmaD2CpYJQABcRIgYlvuiH0a4llIOgkr+FOvTgvXvCOw6sWSW+N+7TKTPrXYKlglAAFxEiD1vZJ2yEA/a2tqhLt0oIB3efyzCal4mcyv4AvHWlhGGtgqWCUAAXESIAC5N5281XW8z6kaQQ92eX/nPM7c15v2RvRGwmmyIVNRrgIBcRIgYlvuiH0a4llIOgkr+FOvTgvXvCOw6sWSW+N+7TKTPrWoYXNYRO2hA0DEW8w5mzAWXJX10pxpDsKoKIDCrFlTY4PfywE/UXfI8AW7WKlOp6oozaZTe2glvVqeaGt0pJH360hBVy1l3ogMYXZlMC45LjFjYXR0gaJjY2FuYSpkd2l0aHg4ZGlkOmtleTp6Nk1rdkRwOWYxcVk4dFBtR2VrODYxcXlBR0VIVFJCZ0NRQnpheWNQb2RDTXk1TUNjYXVkV50abWFpbHRvOmRoYXBweS5vcmc6ZHlzY2V4cPZjZmN0gaFlc3BhY2WhZG5hbWVtUGFydHkgTW9ic3RlcmNpc3NYIu0B6kkpBeI4rIPPuoxdd2hlsK/e4t5fEPimh6v8nYVvZQNjcHJmgKUCAXESIPW9knbIQD9ra2qEu3SggHd5/LMJqXiZzK/gC8daWEYaqGFzWETtoQNAk6cOY2iVSuvdOVJroHRO6NiVIYqGL9+l4q58Dm8ORMxZTxQSKCcHroaAyrsBk20Cl2ToJEQL6euyOLa5Sd06DWF2ZTAuOS4xY2F0dIGiY2NhbmEqZHdpdGh4OGRpZDprZXk6ejZNa3F6V3QyQ1N6Z0Mzbm5ua3V6QzVLdDRUWUU3R1htMUtqVHVaWmtxZmM5MTlSY2F1ZFedGm1haWx0bzpkaGFwcHkub3JnOmR5c2NleHD2Y2ZjdIGhZXNwYWNloWRuYW1lZG1haW5jaXNzWCLtAatyVdPNs2mYANfuwX9o+djjuBw4S6+OfkWOe7YpV+GYY3ByZoCpAgFxEiAAuTedvNV1vM+pGkEPdnl/5zzO3Neb9kb0RsJpsiFTUahhc1hE7aEDQB3yDB7ov0NZSnpvcPpbXfTObrF7fPnSpIVWjNTdBDUNqyxEO/0nWU5JID3iIfSQmSrHiG+6S/HC32V+g1ZzBANhdmUwLjkuMWNhdHSBomNjYW5hKmR3aXRoeDhkaWQ6a2V5Ono2TWtxaFl5WnFzQnM1VExLYk1aVDlGMUF0SG9xMkU2d1ZyaEx5akEyZW9SdGk0V2NhdWRXnRptYWlsdG86ZGhhcHB5Lm9yZzpkeXNjZXhw9mNmY3SBoWVzcGFjZaFkbmFtZWhNZXRhR2FtZWNpc3NYIu0BpxnUvi/IcDeitIQ6Dxvsd1qg0kKDlyD0/3yB4ewUpIdjcHJmgIsDAXESIFNKXoTlS77lh5rKbaWyoltpdZnm8rNW4nPBXEcRtlz2qGFzRICgAwBhdmUwLjkuMWNhdHSBomNjYW5hKmR3aXRoZnVjYW46KmNhdWRYIu0BpjlQjON3KcwiV36/pj7GQo33NrOCJ81pQx8G02Vzj7JjZXhw9mNmY3SBom5hY2Nlc3MvY29uZmlybdgqWCUAAXESIIMLzJiQrj9meJJ2HzqA0s9HWjKK5dlrhso6O0wnEp10bmFjY2Vzcy9yZXF1ZXN02CpYJQABcRIgdCkHJKbxj0PZspZ6t0seYUXz7Yg50UV5JFQl5w9e+1hjaXNzV50abWFpbHRvOmRoYXBweS5vcmc6ZHlzY3ByZoPYKlglAAFxEiBiW+6IfRriWUg6CSv4U69OC9e8I7DqxZJb437tMpM+tdgqWCUAAXESIPW9knbIQD9ra2qEu3SggHd5/LMJqXiZzK/gC8daWEYa2CpYJQABcRIgALk3nbzVdbzPqRpBD3Z5f+c8ztzXm/ZG9EbCabIhU1GuAgFxEiBiW+6IfRriWUg6CSv4U69OC9e8I7DqxZJb437tMpM+tahhc1hE7aEDQMRbzDmbMBZclfXSnGkOwqgogMKsWVNjg9/LAT9Rd8jwBbtYqU6nqijNplN7aCW9Wp5oa3SkkffrSEFXLWXeiAxhdmUwLjkuMWNhdHSBomNjYW5hKmR3aXRoeDhkaWQ6a2V5Ono2TWt2RHA5ZjFxWTh0UG1HZWs4NjFxeUFHRUhUUkJnQ1FCemF5Y1BvZENNeTVNQ2NhdWRXnRptYWlsdG86ZGhhcHB5Lm9yZzpkeXNjZXhw9mNmY3SBoWVzcGFjZaFkbmFtZW1QYXJ0eSBNb2JzdGVyY2lzc1gi7QHqSSkF4jisg8+6jF13aGWwr97i3l8Q+KaHq/ydhW9lA2NwcmaApQIBcRIg9b2SdshAP2traoS7dKCAd3n8swmpeJnMr+ALx1pYRhqoYXNYRO2hA0CTpw5jaJVK6905UmugdE7o2JUhioYv36XirnwObw5EzFlPFBIoJweuhoDKuwGTbQKXZOgkRAvp67I4trlJ3ToNYXZlMC45LjFjYXR0gaJjY2FuYSpkd2l0aHg4ZGlkOmtleTp6Nk1rcXpXdDJDU3pnQzNubm5rdXpDNUt0NFRZRTdHWG0xS2pUdVpaa3FmYzkxOVJjYXVkV50abWFpbHRvOmRoYXBweS5vcmc6ZHlzY2V4cPZjZmN0gaFlc3BhY2WhZG5hbWVkbWFpbmNpc3NYIu0Bq3JV082zaZgA1+7Bf2j52OO4HDhLr45+RY57tilX4ZhjcHJmgKkCAXESIAC5N5281XW8z6kaQQ92eX/nPM7c15v2RvRGwmmyIVNRqGFzWETtoQNAHfIMHui/Q1lKem9w+ltd9M5usXt8+dKkhVaM1N0ENQ2rLEQ7/SdZTkkgPeIh9JCZKseIb7pL8cLfZX6DVnMEA2F2ZTAuOS4xY2F0dIGiY2NhbmEqZHdpdGh4OGRpZDprZXk6ejZNa3FoWXlacXNCczVUTEtiTVpUOUYxQXRIb3EyRTZ3VnJoTHlqQTJlb1J0aTRXY2F1ZFedGm1haWx0bzpkaGFwcHkub3JnOmR5c2NleHD2Y2ZjdIGhZXNwYWNloWRuYW1laE1ldGFHYW1lY2lzc1gi7QGnGdS+L8hwN6K0hDoPG+x3WqDSQoOXIPT/fIHh7BSkh2NwcmaAiwMBcRIgU0pehOVLvuWHmsptpbKiW2l1mebys1bic8FcRxG2XPaoYXNEgKADAGF2ZTAuOS4xY2F0dIGiY2NhbmEqZHdpdGhmdWNhbjoqY2F1ZFgi7QGmOVCM43cpzCJXfr+mPsZCjfc2s4InzWlDHwbTZXOPsmNleHD2Y2ZjdIGibmFjY2Vzcy9jb25maXJt2CpYJQABcRIggwvMmJCuP2Z4knYfOoDSz0daMorl2WuGyjo7TCcSnXRuYWNjZXNzL3JlcXVlc3TYKlglAAFxEiB0KQckpvGPQ9mylnq3Sx5hRfPtiDnRRXkkVCXnD177WGNpc3NXnRptYWlsdG86ZGhhcHB5Lm9yZzpkeXNjcHJmg9gqWCUAAXESIGJb7oh9GuJZSDoJK/hTr04L17wjsOrFklvjfu0ykz612CpYJQABcRIg9b2SdshAP2traoS7dKCAd3n8swmpeJnMr+ALx1pYRhrYKlglAAFxEiAAuTedvNV1vM+pGkEPdnl/5zzO3Neb9kb0RsJpsiFTUa4CAXESIGJb7oh9GuJZSDoJK/hTr04L17wjsOrFklvjfu0ykz61qGFzWETtoQNAxFvMOZswFlyV9dKcaQ7CqCiAwqxZU2OD38sBP1F3yPAFu1ipTqeqKM2mU3toJb1anmhrdKSR9+tIQVctZd6IDGF2ZTAuOS4xY2F0dIGiY2NhbmEqZHdpdGh4OGRpZDprZXk6ejZNa3ZEcDlmMXFZOHRQbUdlazg2MXF5QUdFSFRSQmdDUUJ6YXljUG9kQ015NU1DY2F1ZFedGm1haWx0bzpkaGFwcHkub3JnOmR5c2NleHD2Y2ZjdIGhZXNwYWNloWRuYW1lbVBhcnR5IE1vYnN0ZXJjaXNzWCLtAepJKQXiOKyDz7qMXXdoZbCv3uLeXxD4poer/J2Fb2UDY3ByZoClAgFxEiD1vZJ2yEA/a2tqhLt0oIB3efyzCal4mcyv4AvHWlhGGqhhc1hE7aEDQJOnDmNolUrr3TlSa6B0TujYlSGKhi/fpeKufA5vDkTMWU8UEignB66GgMq7AZNtApdk6CREC+nrsji2uUndOg1hdmUwLjkuMWNhdHSBomNjYW5hKmR3aXRoeDhkaWQ6a2V5Ono2TWtxeld0MkNTemdDM25ubmt1ekM1S3Q0VFlFN0dYbTFLalR1WlprcWZjOTE5UmNhdWRXnRptYWlsdG86ZGhhcHB5Lm9yZzpkeXNjZXhw9mNmY3SBoWVzcGFjZaFkbmFtZWRtYWluY2lzc1gi7QGrclXTzbNpmADX7sF/aPnY47gcOEuvjn5Fjnu2KVfhmGNwcmaAqQIBcRIgALk3nbzVdbzPqRpBD3Z5f+c8ztzXm/ZG9EbCabIhU1GoYXNYRO2hA0Ad8gwe6L9DWUp6b3D6W130zm6xe3z50qSFVozU3QQ1DassRDv9J1lOSSA94iH0kJkqx4hvukvxwt9lfoNWcwQDYXZlMC45LjFjYXR0gaJjY2FuYSpkd2l0aHg4ZGlkOmtleTp6Nk1rcWhZeVpxc0JzNVRMS2JNWlQ5RjFBdEhvcTJFNndWcmhMeWpBMmVvUnRpNFdjYXVkV50abWFpbHRvOmRoYXBweS5vcmc6ZHlzY2V4cPZjZmN0gaFlc3BhY2WhZG5hbWVoTWV0YUdhbWVjaXNzWCLtAacZ1L4vyHA3orSEOg8b7HdaoNJCg5cg9P98geHsFKSHY3ByZoCLAwFxEiBTSl6E5Uu+5Yeaym2lsqJbaXWZ5vKzVuJzwVxHEbZc9qhhc0SAoAMAYXZlMC45LjFjYXR0gaJjY2FuYSpkd2l0aGZ1Y2FuOipjYXVkWCLtAaY5UIzjdynMIld+v6Y+xkKN9zazgifNaUMfBtNlc4+yY2V4cPZjZmN0gaJuYWNjZXNzL2NvbmZpcm3YKlglAAFxEiCDC8yYkK4/ZniSdh86gNLPR1oyiuXZa4bKOjtMJxKddG5hY2Nlc3MvcmVxdWVzdNgqWCUAAXESIHQpBySm8Y9D2bKWerdLHmFF8+2IOdFFeSRUJecPXvtYY2lzc1edGm1haWx0bzpkaGFwcHkub3JnOmR5c2NwcmaD2CpYJQABcRIgYlvuiH0a4llIOgkr+FOvTgvXvCOw6sWSW+N+7TKTPrXYKlglAAFxEiD1vZJ2yEA/a2tqhLt0oIB3efyzCal4mcyv4AvHWlhGGtgqWCUAAXESIAC5N5281XW8z6kaQQ92eX/nPM7c15v2RvRGwmmyIVNRrgIBcRIgYlvuiH0a4llIOgkr+FOvTgvXvCOw6sWSW+N+7TKTPrWoYXNYRO2hA0DEW8w5mzAWXJX10pxpDsKoKIDCrFlTY4PfywE/UXfI8AW7WKlOp6oozaZTe2glvVqeaGt0pJH360hBVy1l3ogMYXZlMC45LjFjYXR0gaJjY2FuYSpkd2l0aHg4ZGlkOmtleTp6Nk1rdkRwOWYxcVk4dFBtR2VrODYxcXlBR0VIVFJCZ0NRQnpheWNQb2RDTXk1TUNjYXVkV50abWFpbHRvOmRoYXBweS5vcmc6ZHlzY2V4cPZjZmN0gaFlc3BhY2WhZG5hbWVtUGFydHkgTW9ic3RlcmNpc3NYIu0B6kkpBeI4rIPPuoxdd2hlsK/e4t5fEPimh6v8nYVvZQNjcHJmgKUCAXESIPW9knbIQD9ra2qEu3SggHd5/LMJqXiZzK/gC8daWEYaqGFzWETtoQNAk6cOY2iVSuvdOVJroHRO6NiVIYqGL9+l4q58Dm8ORMxZTxQSKCcHroaAyrsBk20Cl2ToJEQL6euyOLa5Sd06DWF2ZTAuOS4xY2F0dIGiY2NhbmEqZHdpdGh4OGRpZDprZXk6ejZNa3F6V3QyQ1N6Z0Mzbm5ua3V6QzVLdDRUWUU3R1htMUtqVHVaWmtxZmM5MTlSY2F1ZFedGm1haWx0bzpkaGFwcHkub3JnOmR5c2NleHD2Y2ZjdIGhZXNwYWNloWRuYW1lZG1haW5jaXNzWCLtAatyVdPNs2mYANfuwX9o+djjuBw4S6+OfkWOe7YpV+GYY3ByZoCpAgFxEiAAuTedvNV1vM+pGkEPdnl/5zzO3Neb9kb0RsJpsiFTUahhc1hE7aEDQB3yDB7ov0NZSnpvcPpbXfTObrF7fPnSpIVWjNTdBDUNqyxEO/0nWU5JID3iIfSQmSrHiG+6S/HC32V+g1ZzBANhdmUwLjkuMWNhdHSBomNjYW5hKmR3aXRoeDhkaWQ6a2V5Ono2TWtxaFl5WnFzQnM1VExLYk1aVDlGMUF0SG9xMkU2d1ZyaEx5akEyZW9SdGk0V2NhdWRXnRptYWlsdG86ZGhhcHB5Lm9yZzpkeXNjZXhw9mNmY3SBoWVzcGFjZaFkbmFtZWhNZXRhR2FtZWNpc3NYIu0BpxnUvi/IcDeitIQ6Dxvsd1qg0kKDlyD0/3yB4ewUpIdjcHJmgIsDAXESIFNKXoTlS77lh5rKbaWyoltpdZnm8rNW4nPBXEcRtlz2qGFzRICgAwBhdmUwLjkuMWNhdHSBomNjYW5hKmR3aXRoZnVjYW46KmNhdWRYIu0BpjlQjON3KcwiV36/pj7GQo33NrOCJ81pQx8G02Vzj7JjZXhw9mNmY3SBom5hY2Nlc3MvY29uZmlybdgqWCUAAXESIIMLzJiQrj9meJJ2HzqA0s9HWjKK5dlrhso6O0wnEp10bmFjY2Vzcy9yZXF1ZXN02CpYJQABcRIgdCkHJKbxj0PZspZ6t0seYUXz7Yg50UV5JFQl5w9e+1hjaXNzV50abWFpbHRvOmRoYXBweS5vcmc6ZHlzY3ByZoPYKlglAAFxEiBiW+6IfRriWUg6CSv4U69OC9e8I7DqxZJb437tMpM+tdgqWCUAAXESIPW9knbIQD9ra2qEu3SggHd5/LMJqXiZzK/gC8daWEYa2CpYJQABcRIgALk3nbzVdbzPqRpBD3Z5f+c8ztzXm/ZG9EbCabIhU1GuAgFxEiBiW+6IfRriWUg6CSv4U69OC9e8I7DqxZJb437tMpM+tahhc1hE7aEDQMRbzDmbMBZclfXSnGkOwqgogMKsWVNjg9/LAT9Rd8jwBbtYqU6nqijNplN7aCW9Wp5oa3SkkffrSEFXLWXeiAxhdmUwLjkuMWNhdHSBomNjYW5hKmR3aXRoeDhkaWQ6a2V5Ono2TWt2RHA5ZjFxWTh0UG1HZWs4NjFxeUFHRUhUUkJnQ1FCemF5Y1BvZENNeTVNQ2NhdWRXnRptYWlsdG86ZGhhcHB5Lm9yZzpkeXNjZXhw9mNmY3SBoWVzcGFjZaFkbmFtZW1QYXJ0eSBNb2JzdGVyY2lzc1gi7QHqSSkF4jisg8+6jF13aGWwr97i3l8Q+KaHq/ydhW9lA2NwcmaApQIBcRIg9b2SdshAP2traoS7dKCAd3n8swmpeJnMr+ALx1pYRhqoYXNYRO2hA0CTpw5jaJVK6905UmugdE7o2JUhioYv36XirnwObw5EzFlPFBIoJweuhoDKuwGTbQKXZOgkRAvp67I4trlJ3ToNYXZlMC45LjFjYXR0gaJjY2FuYSpkd2l0aHg4ZGlkOmtleTp6Nk1rcXpXdDJDU3pnQzNubm5rdXpDNUt0NFRZRTdHWG0xS2pUdVpaa3FmYzkxOVJjYXVkV50abWFpbHRvOmRoYXBweS5vcmc6ZHlzY2V4cPZjZmN0gaFlc3BhY2WhZG5hbWVkbWFpbmNpc3NYIu0Bq3JV082zaZgA1+7Bf2j52OO4HDhLr45+RY57tilX4ZhjcHJmgKkCAXESIAC5N5281XW8z6kaQQ92eX/nPM7c15v2RvRGwmmyIVNRqGFzWETtoQNAHfIMHui/Q1lKem9w+ltd9M5usXt8+dKkhVaM1N0ENQ2rLEQ7/SdZTkkgPeIh9JCZKseIb7pL8cLfZX6DVnMEA2F2ZTAuOS4xY2F0dIGiY2NhbmEqZHdpdGh4OGRpZDprZXk6ejZNa3FoWXlacXNCczVUTEtiTVpUOUYxQXRIb3EyRTZ3VnJoTHlqQTJlb1J0aTRXY2F1ZFedGm1haWx0bzpkaGFwcHkub3JnOmR5c2NleHD2Y2ZjdIGhZXNwYWNloWRuYW1laE1ldGFHYW1lY2lzc1gi7QGnGdS+L8hwN6K0hDoPG+x3WqDSQoOXIPT/fIHh7BSkh2NwcmaAiwMBcRIgU0pehOVLvuWHmsptpbKiW2l1mebys1bic8FcRxG2XPaoYXNEgKADAGF2ZTAuOS4xY2F0dIGiY2NhbmEqZHdpdGhmdWNhbjoqY2F1ZFgi7QGmOVCM43cpzCJXfr+mPsZCjfc2s4InzWlDHwbTZXOPsmNleHD2Y2ZjdIGibmFjY2Vzcy9jb25maXJt2CpYJQABcRIggwvMmJCuP2Z4knYfOoDSz0daMorl2WuGyjo7TCcSnXRuYWNjZXNzL3JlcXVlc3TYKlglAAFxEiB0KQckpvGPQ9mylnq3Sx5hRfPtiDnRRXkkVCXnD177WGNpc3NXnRptYWlsdG86ZGhhcHB5Lm9yZzpkeXNjcHJmg9gqWCUAAXESIGJb7oh9GuJZSDoJK/hTr04L17wjsOrFklvjfu0ykz612CpYJQABcRIg9b2SdshAP2traoS7dKCAd3n8swmpeJnMr+ALx1pYRhrYKlglAAFxEiAAuTedvNV1vM+pGkEPdnl/5zzO3Neb9kb0RsJpsiFTUZcDAXESICq010VttSUUd3rxOCSJQcXoYLurTg8w/GFO698UEoT2qGFzWETtoQNAxSBu45rhA7H2rxts2pM+zK+WQUabB/5TEQBhDtJbLZbePj01m2vH8SJaP4EMQDpNmr/DcDGoJwpY5R+NZF0lBmF2ZTAuOS4xY2F0dIGjYm5ioWVwcm9vZtgqWCUAAXESIFNKXoTlS77lh5rKbaWyoltpdZnm8rNW4nPBXEcRtlz2Y2Nhbmt1Y2FuL2F0dGVzdGR3aXRodGRpZDp3ZWI6d2ViMy5zdG9yYWdlY2F1ZFgi7QGmOVCM43cpzCJXfr+mPsZCjfc2s4InzWlDHwbTZXOPsmNleHD2Y2ZjdIGibmFjY2Vzcy9jb25maXJt2CpYJQABcRIggwvMmJCuP2Z4knYfOoDSz0daMorl2WuGyjo7TCcSnXRuYWNjZXNzL3JlcXVlc3TYKlglAAFxEiB0KQckpvGPQ9mylnq3Sx5hRfPtiDnRRXkkVCXnD177WGNpc3NSnRp3ZWI6d2ViMy5zdG9yYWdlY3ByZoCXAwFxEiAqtNdFbbUlFHd68TgkiUHF6GC7q04PMPxhTuvfFBKE9qhhc1hE7aEDQMUgbuOa4QOx9q8bbNqTPsyvlkFGmwf+UxEAYQ7SWy2W3j49NZtrx/EiWj+BDEA6TZq/w3AxqCcKWOUfjWRdJQZhdmUwLjkuMWNhdHSBo2JuYqFlcHJvb2bYKlglAAFxEiBTSl6E5Uu+5Yeaym2lsqJbaXWZ5vKzVuJzwVxHEbZc9mNjYW5rdWNhbi9hdHRlc3Rkd2l0aHRkaWQ6d2ViOndlYjMuc3RvcmFnZWNhdWRYIu0BpjlQjON3KcwiV36/pj7GQo33NrOCJ81pQx8G02Vzj7JjZXhw9mNmY3SBom5hY2Nlc3MvY29uZmlybdgqWCUAAXESIIMLzJiQrj9meJJ2HzqA0s9HWjKK5dlrhso6O0wnEp10bmFjY2Vzcy9yZXF1ZXN02CpYJQABcRIgdCkHJKbxj0PZspZ6t0seYUXz7Yg50UV5JFQl5w9e+1hjaXNzUp0ad2ViOndlYjMuc3RvcmFnZWNwcmaAlwMBcRIgKrTXRW21JRR3evE4JIlBxehgu6tODzD8YU7r3xQShPaoYXNYRO2hA0DFIG7jmuEDsfavG2zakz7Mr5ZBRpsH/lMRAGEO0lstlt4+PTWba8fxIlo/gQxAOk2av8NwMagnCljlH41kXSUGYXZlMC45LjFjYXR0gaNibmKhZXByb29m2CpYJQABcRIgU0pehOVLvuWHmsptpbKiW2l1mebys1bic8FcRxG2XPZjY2Fua3VjYW4vYXR0ZXN0ZHdpdGh0ZGlkOndlYjp3ZWIzLnN0b3JhZ2VjYXVkWCLtAaY5UIzjdynMIld+v6Y+xkKN9zazgifNaUMfBtNlc4+yY2V4cPZjZmN0gaJuYWNjZXNzL2NvbmZpcm3YKlglAAFxEiCDC8yYkK4/ZniSdh86gNLPR1oyiuXZa4bKOjtMJxKddG5hY2Nlc3MvcmVxdWVzdNgqWCUAAXESIHQpBySm8Y9D2bKWerdLHmFF8+2IOdFFeSRUJecPXvtYY2lzc1KdGndlYjp3ZWIzLnN0b3JhZ2VjcHJmgJcDAXESICq010VttSUUd3rxOCSJQcXoYLurTg8w/GFO698UEoT2qGFzWETtoQNAxSBu45rhA7H2rxts2pM+zK+WQUabB/5TEQBhDtJbLZbePj01m2vH8SJaP4EMQDpNmr/DcDGoJwpY5R+NZF0lBmF2ZTAuOS4xY2F0dIGjYm5ioWVwcm9vZtgqWCUAAXESIFNKXoTlS77lh5rKbaWyoltpdZnm8rNW4nPBXEcRtlz2Y2Nhbmt1Y2FuL2F0dGVzdGR3aXRodGRpZDp3ZWI6d2ViMy5zdG9yYWdlY2F1ZFgi7QGmOVCM43cpzCJXfr+mPsZCjfc2s4InzWlDHwbTZXOPsmNleHD2Y2ZjdIGibmFjY2Vzcy9jb25maXJt2CpYJQABcRIggwvMmJCuP2Z4knYfOoDSz0daMorl2WuGyjo7TCcSnXRuYWNjZXNzL3JlcXVlc3TYKlglAAFxEiB0KQckpvGPQ9mylnq3Sx5hRfPtiDnRRXkkVCXnD177WGNpc3NSnRp3ZWI6d2ViMy5zdG9yYWdlY3ByZoCXAwFxEiAqtNdFbbUlFHd68TgkiUHF6GC7q04PMPxhTuvfFBKE9qhhc1hE7aEDQMUgbuOa4QOx9q8bbNqTPsyvlkFGmwf+UxEAYQ7SWy2W3j49NZtrx/EiWj+BDEA6TZq/w3AxqCcKWOUfjWRdJQZhdmUwLjkuMWNhdHSBo2JuYqFlcHJvb2bYKlglAAFxEiBTSl6E5Uu+5Yeaym2lsqJbaXWZ5vKzVuJzwVxHEbZc9mNjYW5rdWNhbi9hdHRlc3Rkd2l0aHRkaWQ6d2ViOndlYjMuc3RvcmFnZWNhdWRYIu0BpjlQjON3KcwiV36/pj7GQo33NrOCJ81pQx8G02Vzj7JjZXhw9mNmY3SBom5hY2Nlc3MvY29uZmlybdgqWCUAAXESIIMLzJiQrj9meJJ2HzqA0s9HWjKK5dlrhso6O0wnEp10bmFjY2Vzcy9yZXF1ZXN02CpYJQABcRIgdCkHJKbxj0PZspZ6t0seYUXz7Yg50UV5JFQl5w9e+1hjaXNzUp0ad2ViOndlYjMuc3RvcmFnZWNwcmaAlwMBcRIgKrTXRW21JRR3evE4JIlBxehgu6tODzD8YU7r3xQShPaoYXNYRO2hA0DFIG7jmuEDsfavG2zakz7Mr5ZBRpsH/lMRAGEO0lstlt4+PTWba8fxIlo/gQxAOk2av8NwMagnCljlH41kXSUGYXZlMC45LjFjYXR0gaNibmKhZXByb29m2CpYJQABcRIgU0pehOVLvuWHmsptpbKiW2l1mebys1bic8FcRxG2XPZjY2Fua3VjYW4vYXR0ZXN0ZHdpdGh0ZGlkOndlYjp3ZWIzLnN0b3JhZ2VjYXVkWCLtAaY5UIzjdynMIld+v6Y+xkKN9zazgifNaUMfBtNlc4+yY2V4cPZjZmN0gaJuYWNjZXNzL2NvbmZpcm3YKlglAAFxEiCDC8yYkK4/ZniSdh86gNLPR1oyiuXZa4bKOjtMJxKddG5hY2Nlc3MvcmVxdWVzdNgqWCUAAXESIHQpBySm8Y9D2bKWerdLHmFF8+2IOdFFeSRUJecPXvtYY2lzc1KdGndlYjp3ZWIzLnN0b3JhZ2VjcHJmgJcDAXESICq010VttSUUd3rxOCSJQcXoYLurTg8w/GFO698UEoT2qGFzWETtoQNAxSBu45rhA7H2rxts2pM+zK+WQUabB/5TEQBhDtJbLZbePj01m2vH8SJaP4EMQDpNmr/DcDGoJwpY5R+NZF0lBmF2ZTAuOS4xY2F0dIGjYm5ioWVwcm9vZtgqWCUAAXESIFNKXoTlS77lh5rKbaWyoltpdZnm8rNW4nPBXEcRtlz2Y2Nhbmt1Y2FuL2F0dGVzdGR3aXRodGRpZDp3ZWI6d2ViMy5zdG9yYWdlY2F1ZFgi7QGmOVCM43cpzCJXfr+mPsZCjfc2s4InzWlDHwbTZXOPsmNleHD2Y2ZjdIGibmFjY2Vzcy9jb25maXJt2CpYJQABcRIggwvMmJCuP2Z4knYfOoDSz0daMorl2WuGyjo7TCcSnXRuYWNjZXNzL3JlcXVlc3TYKlglAAFxEiB0KQckpvGPQ9mylnq3Sx5hRfPtiDnRRXkkVCXnD177WGNpc3NSnRp3ZWI6d2ViMy5zdG9yYWdlY3ByZoCXAwFxEiAqtNdFbbUlFHd68TgkiUHF6GC7q04PMPxhTuvfFBKE9qhhc1hE7aEDQMUgbuOa4QOx9q8bbNqTPsyvlkFGmwf+UxEAYQ7SWy2W3j49NZtrx/EiWj+BDEA6TZq/w3AxqCcKWOUfjWRdJQZhdmUwLjkuMWNhdHSBo2JuYqFlcHJvb2bYKlglAAFxEiBTSl6E5Uu+5Yeaym2lsqJbaXWZ5vKzVuJzwVxHEbZc9mNjYW5rdWNhbi9hdHRlc3Rkd2l0aHRkaWQ6d2ViOndlYjMuc3RvcmFnZWNhdWRYIu0BpjlQjON3KcwiV36/pj7GQo33NrOCJ81pQx8G02Vzj7JjZXhw9mNmY3SBom5hY2Nlc3MvY29uZmlybdgqWCUAAXESIIMLzJiQrj9meJJ2HzqA0s9HWjKK5dlrhso6O0wnEp10bmFjY2Vzcy9yZXF1ZXN02CpYJQABcRIgdCkHJKbxj0PZspZ6t0seYUXz7Yg50UV5JFQl5w9e+1hjaXNzUp0ad2ViOndlYjMuc3RvcmFnZWNwcmaA6AsBcRIgIy65TNcZ2LtzpLniqdeZ3568eYfsski6N1qDzfaMDweoYXNYRO2hA0ADgnsU5FlUpl04R0FRkZZNpSzVQkKkeXfKVoIjxQaFvcjxCu2lmu6/j3rDd66JzxMIS+zQ3exboJUR/o0g1l0IYXZlMC45LjFjYXR0iKJjY2FuZ3NwYWNlLypkd2l0aHg4ZGlkOmtleTp6Nk1rdkRwOWYxcVk4dFBtR2VrODYxcXlBR0VIVFJCZ0NRQnpheWNQb2RDTXk1TUOiY2NhbmZibG9iLypkd2l0aHg4ZGlkOmtleTp6Nk1rdkRwOWYxcVk4dFBtR2VrODYxcXlBR0VIVFJCZ0NRQnpheWNQb2RDTXk1TUOiY2NhbmdpbmRleC8qZHdpdGh4OGRpZDprZXk6ejZNa3ZEcDlmMXFZOHRQbUdlazg2MXF5QUdFSFRSQmdDUUJ6YXljUG9kQ015NU1DomNjYW5nc3RvcmUvKmR3aXRoeDhkaWQ6a2V5Ono2TWt2RHA5ZjFxWTh0UG1HZWs4NjFxeUFHRUhUUkJnQ1FCemF5Y1BvZENNeTVNQ6JjY2FuaHVwbG9hZC8qZHdpdGh4OGRpZDprZXk6ejZNa3ZEcDlmMXFZOHRQbUdlazg2MXF5QUdFSFRSQmdDUUJ6YXljUG9kQ015NU1DomNjYW5oYWNjZXNzLypkd2l0aHg4ZGlkOmtleTp6Nk1rdkRwOWYxcVk4dFBtR2VrODYxcXlBR0VIVFJCZ0NRQnpheWNQb2RDTXk1TUOiY2NhbmpmaWxlY29pbi8qZHdpdGh4OGRpZDprZXk6ejZNa3ZEcDlmMXFZOHRQbUdlazg2MXF5QUdFSFRSQmdDUUJ6YXljUG9kQ015NU1DomNjYW5ndXNhZ2UvKmR3aXRoeDhkaWQ6a2V5Ono2TWt2RHA5ZjFxWTh0UG1HZWs4NjFxeUFHRUhUUkJnQ1FCemF5Y1BvZENNeTVNQ2NhdWRYIu0BtEUa9Y4ipS74cn4lMtIM3fkJBoYhiYjIgnvd7nEeO39jZXhw9mNmY3SBoWVzcGFjZaFkbmFtZW1QYXJ0eSBNb2JzdGVyY2lzc1gi7QGmOVCM43cpzCJXfr+mPsZCjfc2s4InzWlDHwbTZXOPsmNwcmaQ2CpYJQABcRIgU0pehOVLvuWHmsptpbKiW2l1mebys1bic8FcRxG2XPbYKlglAAFxEiBTSl6E5Uu+5Yeaym2lsqJbaXWZ5vKzVuJzwVxHEbZc9tgqWCUAAXESIFNKXoTlS77lh5rKbaWyoltpdZnm8rNW4nPBXEcRtlz22CpYJQABcRIgU0pehOVLvuWHmsptpbKiW2l1mebys1bic8FcRxG2XPbYKlglAAFxEiBTSl6E5Uu+5Yeaym2lsqJbaXWZ5vKzVuJzwVxHEbZc9tgqWCUAAXESIFNKXoTlS77lh5rKbaWyoltpdZnm8rNW4nPBXEcRtlz22CpYJQABcRIgU0pehOVLvuWHmsptpbKiW2l1mebys1bic8FcRxG2XPbYKlglAAFxEiBTSl6E5Uu+5Yeaym2lsqJbaXWZ5vKzVuJzwVxHEbZc9tgqWCUAAXESICq010VttSUUd3rxOCSJQcXoYLurTg8w/GFO698UEoT22CpYJQABcRIgKrTXRW21JRR3evE4JIlBxehgu6tODzD8YU7r3xQShPbYKlglAAFxEiAqtNdFbbUlFHd68TgkiUHF6GC7q04PMPxhTuvfFBKE9tgqWCUAAXESICq010VttSUUd3rxOCSJQcXoYLurTg8w/GFO698UEoT22CpYJQABcRIgKrTXRW21JRR3evE4JIlBxehgu6tODzD8YU7r3xQShPbYKlglAAFxEiAqtNdFbbUlFHd68TgkiUHF6GC7q04PMPxhTuvfFBKE9tgqWCUAAXESICq010VttSUUd3rxOCSJQcXoYLurTg8w/GFO698UEoT22CpYJQABcRIgKrTXRW21JRR3evE4JIlBxehgu6tODzD8YU7r3xQShPY'
  const { KEY, PROOF = pastedProof } = process.env
  if(!KEY) {
    return Response.json(
      { error: 'Missing `KEY` environment variable.' },
      { status: 500, headers },
    )
  }
  if(!PROOF) {
    return Response.json(
      { error: 'Missing `PROOF` environment variable.' },
      { status: 500, headers },
    )
  }

  const principal = Signer.parse(KEY)
  const store = new StoreMemory()
  const client = await Client.create({ principal, store })

  const proof = await Proof.parse(PROOF)
  const space = await client.addSpace(proof)
  await client.setCurrentSpace(space.did())

  const { did } = await req.json()
  const audience = DID.parse(did)
  const abilities = ['space/blob/add', 'space/index/add', 'upload/add']
  const expiration = Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours from now
  const delegation = await client.createDelegation(audience, abilities, { expiration })

  const { ok, error } = await delegation.archive()
  if(error) {
    return Response.json(
      { error }, { status: 500, headers },
    )
  }
  return Response.json(
    { delegation: Object.values(ok) }, { status: 201, headers },
  )
}