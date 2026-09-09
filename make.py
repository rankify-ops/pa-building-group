#!/usr/bin/env python3
"""Regenerate every HTML file in the PA Building Group site.

    python make.py
"""
import pages, pages2, pages3

if __name__ == "__main__":
    print("Building PA Building Group…")
    pages.build_home()
    pages2.build_service_pages()
    pages3.build_services()
    pages3.build_projects()
    pages3.build_about()
    pages3.build_contact()
    pages3.build_thankyou()
    pages3.build_404()
    pages3.build_locations()
    pages3.build_sitemap()
    print("Done.")
