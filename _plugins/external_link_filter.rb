module Jekyll
  module ExternalLinkFilter
    def external_link_filter(input)
      input.gsub(/<a (href="http[^"]+")>/, '<a \1 target="_blank">')
    end
  end
end

Liquid::Template.register_filter(Jekyll::ExternalLinkFilter)