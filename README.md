## GHL Bulk Email Validator

Some Go High Level users may run into the situation where they have enabled Mailgun email validation integration for their GHL location ( agency or sub-user ), *after* there are already many contacts in their location account. Currently, Mailgun email validation only validates contact email addresses on a go-forward basis. The GHL user will need to manually validate each preexisting contact's email, which of course can be very time consuming. ( watch manual validation video demonstration )

The NodeJS script validates all contact email addresses for a GHL location (main or sub-account). Note that Mailgun integration activation in GHL for the location is required.

**Installation**

    # cd ghl-bulk-email-validator
    # npm install

