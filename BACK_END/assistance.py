import pycountry as ctry
import phonenumbers as ph
from phonenumbers import geocoder
from phonenumbers import carrier
from enum import Enum


class Figures:
    @classmethod
    def set_up(cls, data):
        return {"figures": data}


class Languages(Enum):
    en = "English"


class PyCountries:
    @staticmethod
    def take():
        return {co.name: co.alpha_2 for co in ctry.countries}

    @staticmethod
    def take_code():
        return Figures.set_up([code for code, isos in ph.COUNTRY_CODE_TO_REGION_CODE.items()])

    @staticmethod
    def take_code_by(iso):
        for code, isos in ph.COUNTRY_CODE_TO_REGION_CODE.items():
            if iso.upper() in isos:
                return str(code)
        return None


class Tracker:
    @staticmethod
    def take_by_iso(iso, phone):
        ph_parse = ph.parse(f"+{PyCountries.take_code_by(iso)}{phone}")
        return {"country": geocoder.description_for_number(ph_parse, Languages.en.name),
                "country_code": ph_parse.country_code,
                "national_number": ph_parse.national_number,
                "service_provider": carrier.name_for_number(ph_parse, Languages.en.name)}

    @staticmethod
    def take_by_code(code, phone):
        ph_parse = ph.parse(f"+{code}{phone}")
        return {"country": geocoder.description_for_number(ph_parse, Languages.en.name),
                "country_code": ph_parse.country_code,
                "national_number": ph_parse.national_number,
                "service_provider": carrier.name_for_number(ph_parse, Languages.en.name)}
