# #!/bin/bash
# # Parrot OS Optimization Script
# # Disables unnecessary services for coding/dev without breaking native OS

# echo "🔹 Starting Parrot OS optimization..."

# # -------------------------------
# # List of services safe to disable
# # -------------------------------
# SERVICES=(

#   # Printing / Scanner
#   cups.service
#   cups-browsed.service
#   saned.service
#   ipp-usb.service
#   configure-printer@.service

#   # Network extras not needed for dev
#   avahi-daemon.service
#   cni-dhcp.service
#   lxc@.service
#   podman-kube@.service
#   openvpn-client@.service
#   openvpn-server@.service
#   openvpn@.service
#   vpn@.service
#   xl2tpd.service

#   # VM extras
#   hv-kvp-daemon.service
#   hv-vss-daemon.service
#   spice-vdagentd.service
#   virtualbox-guest-utils.service
#   vmtoolsd.service

#   # Tor / anonymity / pentesting
#   tor.service
#   tor@.service
#   anonsurfd.service
#   strongswan-starter.service

#   # Heavy DB / web servers not used
#   postgresql.service
#   postgresql@.service
#   nginx.service
#   redis-server.service
#   redis-server@.service

#   # Audio / multimedia services
#   pulseaudio-enable-autospawn.service
#   rtkit-daemon.service

#   # Misc hardware / sensors / unused
#   usb_modeswitch@.service
#   wacom-inputattach@.service
#   upower.service
# )

# # -------------------------------
# # Disable & mask the services
# # -------------------------------
# for svc in "${SERVICES[@]}"; do
#     if systemctl list-unit-files | grep -q "^$svc"; then
#         echo "🔹 Disabling and masking $svc"
#         sudo systemctl enable "$svc"
#         sudo systemctl mask "$svc"
#     else
#         echo "⚠️  Service $svc not found, skipping..."
#     fi
# done

# echo "✅ Optimization complete! Reboot recommended."

#!/bin/bash
# Parrot OS Script: Enable / Start selected services

echo "🔹 Starting selected services..."

SERVICES=(

  # Printing / Scanner
  cups.service
  cups-browsed.service
  saned.service
  ipp-usb.service
  configure-printer@.service

  # Network extras
  avahi-daemon.service
  cni-dhcp.service
  lxc@.service
  podman-kube@.service
  openvpn-client@.service
  openvpn-server@.service
  openvpn@.service
  vpn@.service
  xl2tpd.service

  # VM extras
  hv-kvp-daemon.service
  hv-vss-daemon.service
  spice-vdagentd.service
  virtualbox-guest-utils.service
  vmtoolsd.service

  # Tor / anonymity / pentesting
  tor.service
  tor@.service
  anonsurfd.service
  strongswan-starter.service

  # Heavy DB / web servers
  postgresql.service
  postgresql@.service
  nginx.service
  redis-server.service
  redis-server@.service

  # Audio / multimedia
  pulseaudio-enable-autospawn.service
  rtkit-daemon.service

  # Misc hardware / sensors
  usb_modeswitch@.service
  wacom-inputattach@.service
  upower.service
)

# -------------------------------
# Enable & start the services
# -------------------------------
for svc in "${SERVICES[@]}"; do
    if systemctl list-unit-files | grep -q "^$svc"; then
        echo "🔹 Enabling and starting $svc"
        sudo systemctl unmask "$svc"   # in case it was masked
        sudo systemctl enable "$svc"
        sudo systemctl start "$svc"
    else
        echo "⚠️  Service $svc not found, skipping..."
    fi
done

echo "✅ All selected services have been enabled and started."
